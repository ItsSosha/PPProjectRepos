package rozetka

import (
	"errors"
	"github.com/gocolly/colly/v2"
	"log"
	"strconv"
	"strings"
	"time"
)

const PARALLEL = 1
const RANDOM_DELAY = 3 // c
const MIN_DELAY = 600  // mlc
const ASYNC = false

func parseNumber(str string) (float64, error) {
	numStr := ""
	const formatString = "0123456789"

	for _, el := range str {
		if strings.ContainsAny(string(el), formatString) {
			numStr += string(el)
		}
	}
	result, err := strconv.ParseFloat(numStr, 64)

	if result == 0 {
		err = errors.New("-> Parsed number is 0")
	}

	return result, err
}

func ParsePrice(url string) (price float64, oldPrice float64, isOnSale bool) {
	itemsCollector := colly.NewCollector(
		colly.Async(ASYNC),
	)

	itemsCollector.OnHTML("app-root", func(itemPage *colly.HTMLElement) {
		if pr, err := parseNumber(itemPage.ChildText("p.product-price__big")); err == nil {
			price = pr
		}

		if pr, err := parseNumber(itemPage.ChildText("p.product-price__small")); err == nil {
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
