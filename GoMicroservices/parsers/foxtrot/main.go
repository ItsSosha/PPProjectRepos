package main //package foxtrot

import (
	"GoMicroservices/CoreStructs"
	"fmt"
	"github.com/gocolly/colly/v2"
	"log"
	"strconv"
	"strings"
	"time"
)

const PARALLEL = 1
const RANDOM_DELAY = 20 // c
const MIN_DELAY = 5000  // mlc

type AddSpecification func(specification CoreStructs.Specification)
type AddItem func(specification CoreStructs.RawItem)
type AddCategory func(specification CoreStructs.RawCategory)

func getId(storeId int64, rawId string) int64 {
	pseudoId := strconv.Itoa(int(storeId)) + rawId
	var id int64
	if parsedId, err := strconv.Atoi(pseudoId); err == nil {
		id = int64(parsedId)
	}

	return id
}

func parseSpecsForItem(itemId int64, addSpecificationFunc AddSpecification, specs *colly.HTMLElement) {
	specs.ForEach("div.main-details__item", func(i int, spec *colly.HTMLElement) {
		var key string
		var value string

		spec.ForEach("div.main-details__item_name", func(i int, keyElement *colly.HTMLElement) {
			key += strings.Trim(keyElement.ChildText("span"), " ")
		})

		spec.ForEach("div.main-details__item_value", func(i int, valueElements *colly.HTMLElement) {
			valueElements.ForEach("a.prop-value", func(i int, valueElement *colly.HTMLElement) {
				value += valueElement.Text + " "
			})
		})
		value = strings.Trim(value, " ")

		specification := CoreStructs.Specification{
			RawItemId: itemId,
			Key:       key,
			Value:     value,
		}
		addSpecificationFunc(specification)
	})
}

func parseItem(store CoreStructs.Store, addItemFunc AddItem, addSpecificationFunc AddSpecification) *colly.Collector {
	itemsCollector := colly.NewCollector(
		colly.Async(true),
	)

	itemsCollector.OnHTML("div.page", func(itemPage *colly.HTMLElement) {
		id := getId(store.Id, itemPage.ChildAttr("div.product-box__content", "data-code"))
		name := itemPage.ChildAttr("div.product-box__content", "data-title")

		var price float64
		if pr, err := strconv.ParseFloat(itemPage.ChildAttr("div.product-box__content", "data-price"), 64); err == nil {
			price = pr
		}

		var oldPrice float64
		isOnSale := false
		itemPage.ForEach("div.product-box__main_discount", func(index int, discountElement *colly.HTMLElement) {
			rawOldPrice := discountElement.ChildText("label")
			if pr, err := strconv.ParseFloat(rawOldPrice, 64); err == nil {
				oldPrice = pr
				isOnSale = true
			}
		})

		var pictureLink string
		itemPage.ForEach("div.product-img__carousel", func(i int, imageList *colly.HTMLElement) {
			imageList.ForEachWithBreak("img", func(i int, image *colly.HTMLElement) bool {
				if i > 0 {
					return false
				}
				pictureLink = image.Attr("src")
				return true
			})
		})

		categoryId := getId(store.Id, itemPage.ChildAttr("li.category-id-container", "data-category"))

		item := CoreStructs.RawItem{
			Id:            id,
			Name:          name,
			RawPrice:      price,
			OldPrice:      oldPrice,
			IsOnSale:      isOnSale,
			RawItemURL:    itemPage.Request.URL.String(),
			RawCategoryId: categoryId,
			Description:   "",
			RawIconURL:    pictureLink,
		}

		if price != 0 {
			addItemFunc(item)

			itemPage.ForEach("div.main_details_groupe", func(i int, specs *colly.HTMLElement) {
				parseSpecsForItem(id, addSpecificationFunc, specs)
			})
		}
	})

	itemsCollector.Limit(&colly.LimitRule{
		Parallelism: PARALLEL,
		RandomDelay: RANDOM_DELAY * time.Second,
		Delay:       MIN_DELAY * time.Millisecond,
	})

	return itemsCollector
}

func parseCategory(store CoreStructs.Store, addCategoryFunc AddCategory, itemsCollector *colly.Collector) *colly.Collector {
	categoriesCollector := colly.NewCollector(
		colly.Async(true),
	)

	categoriesCollector.OnHTML("div.page", func(categoryPage *colly.HTMLElement) {
		id := getId(store.Id, categoryPage.ChildAttr("li.category-id-container", "data-category"))
		pageHeader := categoryPage.ChildText("h1.with-counter")

		category := CoreStructs.RawCategory{
			Id:             id,
			ParsedName:     pageHeader,
			StoreId:        store.Id,
			CategoryId:     -1,
			RawCategoryURL: categoryPage.Request.URL.String(),
		}

		addCategoryFunc(category)

		categoryPage.ForEach("a.card__title[href]", func(i int, productCardTitle *colly.HTMLElement) {
			link := productCardTitle.Attr("href")

			err := itemsCollector.Visit(store.URL + link)
			if err != nil {
				log.Println("Error in parsing item card element on category page!")
			}
		})
	})

	categoriesCollector.Limit(&colly.LimitRule{
		Parallelism: PARALLEL,
		RandomDelay: RANDOM_DELAY * time.Second,
		Delay:       MIN_DELAY * time.Millisecond,
	})

	return categoriesCollector
}

func parseHomePage(store CoreStructs.Store, categoriesCollector *colly.Collector) *colly.Collector {
	homePageCollector := colly.NewCollector(
		colly.Async(true),
	)

	homePageCollector.OnHTML("a.catalog-sub__title_link", func(categoryElement *colly.HTMLElement) {
		link := categoryElement.Attr("href")

		err := categoriesCollector.Visit(store.URL + link)
		if err != nil {
			log.Println("Error in parsing category element in homepage!")
		}
	})

	homePageCollector.Limit(&colly.LimitRule{
		Parallelism: PARALLEL,
		RandomDelay: RANDOM_DELAY * time.Second,
		Delay:       MIN_DELAY * time.Millisecond,
	})

	return homePageCollector
}

func main() {
	store := CoreStructs.Store{
		Id:      1,
		Name:    "Foxtrot",
		URL:     "https://foxtrot.com.ua",
		IconURL: "",
	}

	var specificationStorage []CoreStructs.Specification
	var categoryStorage []CoreStructs.RawCategory
	var itemStorage []CoreStructs.RawItem

	var addSpecification AddSpecification = func(spec CoreStructs.Specification) {
		specificationStorage = append(specificationStorage, spec)
	}
	var addCategory AddCategory = func(category CoreStructs.RawCategory) {
		categoryStorage = append(categoryStorage, category)
	}
	var addItem AddItem = func(item CoreStructs.RawItem) {
		itemStorage = append(itemStorage, item)
	}

	itemCollector := parseItem(store, addItem, addSpecification)
	categoryCollector := parseCategory(store, addCategory, itemCollector)
	homePageCollector := parseHomePage(store, categoryCollector)

	err := homePageCollector.Visit("https://foxtrot.com.ua/ua")
	if err != nil {
		fmt.Println("Error in visiting main page")
	}

	homePageCollector.Wait()
	categoryCollector.Wait()
	itemCollector.Wait()
	fmt.Println(len(categoryStorage))
	fmt.Println(len(itemStorage))
	fmt.Println(len(specificationStorage))
}
