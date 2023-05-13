package rozetka

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

	itemsCollector.OnHTML("app-root", func(itemPage *colly.HTMLElement) {
		if pr, err := strconv.ParseFloat(strings.ReplaceAll(strings.Trim(itemPage.ChildText("p.product-price__big"), "₴"), " ", ""), 64); err == nil {
			price = pr
		}

		oldPriceString := strings.ReplaceAll(strings.Trim(itemPage.ChildText("p.product-price__small"), "₴"), " ", "")
		if pr, err := strconv.ParseFloat(oldPriceString, 64); err == nil {
			oldPrice = pr
			isOnSale = true
		}
	})

	itemsCollector.Limit(&colly.LimitRule{
		Parallelism: PARALLEL,
		RandomDelay: RANDOM_DELAY * time.Second,
		Delay:       MIN_DELAY * time.Millisecond,
	})

	err := itemsCollector.Visit(url)
	if err != nil {
		log.Println("Rozetka price parsing error")
	}

	itemsCollector.Wait()

	return price, oldPrice, isOnSale
}
