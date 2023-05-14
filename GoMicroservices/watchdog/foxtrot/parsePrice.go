package foxtrot

import (
	"github.com/gocolly/colly/v2"
	"log"
	"strconv"
	"strings"
	"time"
)

const PARALLEL = 2
const RANDOM_DELAY = 3 // c
const MIN_DELAY = 600  // mlc
const ASYNC = false

func ParsePrice(url string) (price float64, oldPrice float64, isOnSale bool) {
	itemsCollector := colly.NewCollector(
		colly.Async(ASYNC),
	)

	itemsCollector.OnHTML("div.page", func(itemPage *colly.HTMLElement) {
		if pr, err := strconv.ParseFloat(itemPage.ChildAttr("div.product-box__content", "data-price"), 64); err == nil {
			price = pr
		}

		itemPage.ForEach("div.product-box__main_discount", func(index int, discountElement *colly.HTMLElement) {
			rawOldPrice := discountElement.ChildText("label")
			if pr, err := strconv.ParseFloat(strings.ReplaceAll(rawOldPrice, " ", ""), 64); err == nil {
				oldPrice = pr
				isOnSale = true
			}
		})
	})

	itemsCollector.Limit(&colly.LimitRule{
		Parallelism: PARALLEL,
		RandomDelay: RANDOM_DELAY * time.Second,
		Delay:       MIN_DELAY * time.Millisecond,
	})

	err := itemsCollector.Visit(url)
	if err != nil {
		log.Println("Foxtrot price parsing error")
	}

	itemsCollector.Wait()

	return price, oldPrice, isOnSale
}
