package main //package rozetka

import (
	"GoMicroservices/CoreStructs"
	"GoMicroservices/genericDb"
	"encoding/json"
	"fmt"
	"github.com/gocolly/colly/v2"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"hash/crc32"
	"log"
	"os"
	"strconv"
	"strings"
	"time"
)

const PARALLEL = 2
const RANDOM_DELAY = 3 // c
const MIN_DELAY = 600  // mlc
const ASYNC = false

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

func getCategoryId(storeId int64, rawId string) int64 {
	rawUIntId := crc32.ChecksumIEEE([]byte(rawId))
	var rawIntId int64
	if rawUIntId < 0 {
		rawIntId = -1 * int64(rawUIntId)
	} else {
		rawIntId = int64(rawUIntId)
	}

	return getId(storeId, strconv.Itoa(int(rawIntId)))
}

func parseSpecsForItem(itemId int64, addSpecificationFunc AddSpecification, spec *colly.HTMLElement) {
	var value string

	key := spec.ChildText("dt.characteristics-full__label")

	spec.ForEach("dd.characteristics-full__value", func(i int, valueElements *colly.HTMLElement) {
		valueElements.ForEach("li", func(i int, valueElement *colly.HTMLElement) {
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
}

func parseItem(store CoreStructs.Store, addItemFunc AddItem, addSpecificationFunc AddSpecification) *colly.Collector {
	itemsCollector := colly.NewCollector(
		colly.Async(ASYNC),
	)

	itemsCollector.OnHTML("app-root", func(itemPage *colly.HTMLElement) {
		id := getCategoryId(store.Id, itemPage.Request.URL.String())
		name := itemPage.ChildText("h1.product__title")

		var price float64
		if pr, err := strconv.ParseFloat(strings.ReplaceAll(strings.Trim(itemPage.ChildText("p.product-price__big"), "₴"), " ", ""), 64); err == nil {
			price = pr
		}

		var oldPrice float64
		isOnSale := false
		oldPriceString := strings.ReplaceAll(strings.Trim(itemPage.ChildText("p.product-price__small"), "₴"), " ", "")
		if pr, err := strconv.ParseFloat(oldPriceString, 64); err == nil {
			oldPrice = pr
			isOnSale = true
		}

		var pictureLink string
		itemPage.ForEachWithBreak("img.picture-container__picture", func(i int, image *colly.HTMLElement) bool {
			if i > 0 {
				return false
			}
			pictureLink = image.Attr("src")
			return true
		})

		var categoryString string
		itemPage.ForEachWithBreak("a.breadcrumbs__link", func(i int, categoryLink *colly.HTMLElement) bool {
			if i != 1 {
				return true
			}
			categoryString = categoryLink.Attr("href")
			return false
		})
		if categoryString == "" {
			log.Fatalln("Err in finding category")
		}
		categoryId := getCategoryId(store.Id, categoryString)

		description := itemPage.ChildText("div.product-about__description-content")

		item := CoreStructs.RawItem{
			Id:            id,
			Name:          name,
			RawPrice:      price,
			OldPrice:      oldPrice,
			IsOnSale:      isOnSale,
			RawItemURL:    itemPage.Request.URL.String(),
			RawCategoryId: categoryId,
			Description:   description,
			RawIconURL:    pictureLink,
		}

		if price != 0 {
			addItemFunc(item)

			itemPage.ForEach("div.characteristics-full__item", func(i int, specs *colly.HTMLElement) {
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

func parseCategory(store CoreStructs.Store, itemsCollector *colly.Collector) *colly.Collector {
	categoriesCollector := colly.NewCollector(
		colly.Async(ASYNC),
	)

	categoriesCollector.OnHTML("a.goods-tile__heading", func(cardHeading *colly.HTMLElement) {
		link := cardHeading.Attr("href")

		err := itemsCollector.Visit(link)
		if err != nil {
			log.Println("Err parse item from subcategory page")
		}
	})

	categoriesCollector.OnHTML("li.tile-cats__item", func(categoryLink *colly.HTMLElement) {
		link := categoryLink.ChildAttr("a", "href")

		err := categoriesCollector.Visit(link)
		if err != nil {
			log.Println("Err in parsing subcategory page")
		}
	})

	categoriesCollector.Limit(&colly.LimitRule{
		Parallelism: PARALLEL,
		RandomDelay: RANDOM_DELAY * time.Second,
		Delay:       MIN_DELAY * time.Millisecond,
	})

	return categoriesCollector
}

func parseHomePage(store CoreStructs.Store, categoriesCollector *colly.Collector, addCategoryFunc AddCategory) *colly.Collector {
	homePageCollector := colly.NewCollector(
		colly.Async(ASYNC),
	)

	homePageCollector.OnHTML("h1.portal__heading", func(categoryHeading *colly.HTMLElement) {
		id := getCategoryId(store.Id, categoryHeading.Request.URL.String())
		pageHeader := categoryHeading.Text

		category := CoreStructs.RawCategory{
			Id:             id,
			ParsedName:     pageHeader,
			StoreId:        store.Id,
			RawCategoryURL: categoryHeading.Request.URL.String(),
		}

		addCategoryFunc(category)
		err := categoriesCollector.Visit(categoryHeading.Request.URL.String())
		if err != nil {
			log.Println("Err in parsing category!")
		}
	})

	homePageCollector.OnHTML("a.menu-categories__link", func(categoryElement *colly.HTMLElement) {
		link := categoryElement.Attr("href")

		err := homePageCollector.Visit(link)
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
	conn, err := os.ReadFile("./connectionString.json")
	if err != nil {
		log.Fatalln(err)
	}

	var connectionString string
	if err := json.Unmarshal(conn, &connectionString); err != nil {
		log.Fatalln(err)
	}

	db := sqlx.MustConnect("postgres", connectionString)
	defer db.Close()
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(4)

	store := CoreStructs.Store{
		Id:      2,
		Name:    "Rozetka",
		URL:     "https://rozetka.com.ua",
		IconURL: "https://content1.rozetka.com.ua/sellers/logo_svg/original/187326382.svg",
	}

	err = genericDb.Insert(db, CoreStructs.StoreInsertQuery, store)
	if err != nil {
		log.Fatalln(err)
	}

	//var specificationStorage []CoreStructs.Specification
	//var categoryStorage []CoreStructs.RawCategory
	//var itemStorage []CoreStructs.RawItem
	//
	//var addSpecification AddSpecification = func(spec CoreStructs.Specification) {
	//	specificationStorage = append(specificationStorage, spec)
	//}
	//var addCategory AddCategory = func(category CoreStructs.RawCategory) {
	//	categoryStorage = append(categoryStorage, category)
	//}
	//var addItem AddItem = func(item CoreStructs.RawItem) {
	//	itemStorage = append(itemStorage, item)
	//}

	var addSpecification AddSpecification = func(spec CoreStructs.Specification) {
		err := genericDb.Insert(db, CoreStructs.SpecInsertQuery, spec)
		if err != nil {
			log.Println("Error in adding spec to db")
			log.Println(err)
		}
	}
	var addCategory AddCategory = func(category CoreStructs.RawCategory) {
		err := genericDb.Insert(db, CoreStructs.CategoryInsertQuery, category)
		if err != nil {
			log.Println("Error in adding category to db")
			log.Println(err)
		}
	}
	var addItem AddItem = func(item CoreStructs.RawItem) {
		err := genericDb.Insert(db, CoreStructs.RawItemInsertQuery, item)
		if err != nil {
			log.Println("Error in adding item to db")
			log.Println(err)
		}
	}

	itemCollector := parseItem(store, addItem, addSpecification)
	categoryCollector := parseCategory(store, itemCollector)
	homePageCollector := parseHomePage(store, categoryCollector, addCategory)

	homePageErr := homePageCollector.Visit("https://rozetka.com.ua/ua")
	if homePageErr != nil {
		fmt.Println("Error in visiting main page")
	}

	homePageCollector.Wait()
	categoryCollector.Wait()
	itemCollector.Wait()
	//fmt.Println(len(categoryStorage))
	//fmt.Println(len(itemStorage))
	//fmt.Println(len(specificationStorage))
}
