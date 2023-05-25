package main

import (
	"GoMicroservices/CoreStructs"
	"GoMicroservices/genericDb"
	"GoMicroservices/watchdog/foxtrot"
	"GoMicroservices/watchdog/notifications"
	"GoMicroservices/watchdog/rozetka"
	"encoding/json"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"os"
	"time"
)

func UpdateRawItemPrice(db *sqlx.DB, rawItemId int64, price float64, oldPrice float64, isOnSale bool) error {
	query := "UPDATE " + CoreStructs.RawItemTableName + " SET " +
		"\"RawPrice\" = $2, \"OldPrice\" = $3, \"IsOnSale\" = $4 " +
		"WHERE \"Id\" = $1"

	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	_, err := db.Exec(query, rawItemId, price, oldPrice, isOnSale)
	if err != nil {
		return err
	}

	return nil
}

func isPriceHistoryInitialised(db *sqlx.DB, itemId int64) bool {
	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	getString := "SELECT * FROM " + CoreStructs.PriceHistoryTableName + " where \"ItemId\"=$1"

	objectList := []CoreStructs.PriceHistory{}
	err := db.Select(&objectList, getString, itemId)
	if err != nil {
		log.Println("Err to get structs from table PriceHistory")
		return false
	}

	return len(objectList) != 0
}

func getLastDate(db *sqlx.DB) (time.Time, error) {
	query := "SELECT max(\"Date\") from " + CoreStructs.PriceHistoryTableName

	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	var result time.Time
	err := db.Get(&result, query)
	if err != nil {
		log.Println("Err to get last date")
	}

	return result, err
}

func watchdogIteration(db *sqlx.DB) {
	insertPriceHistory := func(priceHistory CoreStructs.PriceHistory) {
		err := genericDb.Insert(db, CoreStructs.PriceHistoryInsertQuery, priceHistory)
		if err != nil {
			log.Println("Error in adding PriceHistory to db")
			log.Println(err)
		}
	}

	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	items, err := genericDb.SelectAll[CoreStructs.Item](db, CoreStructs.ItemTableName)
	if err != nil {
		panic("Cannot get Items from db")
	}

	for _, item := range items {
		rawItem, err := genericDb.GetById[CoreStructs.RawItem](db, CoreStructs.RawItemTableName, item.RawItemId)
		if err != nil {
			log.Println("Cannot get RawItem from db, continuing...")
			continue
		}

		rawCategory, err := genericDb.GetById[CoreStructs.RawCategory](db, CoreStructs.RawCategoryTableName, rawItem.RawCategoryId)
		if err != nil {
			log.Println("Cannot get RawCategory from db, continuing...")
			log.Println(err)
			continue
		}

		var currentPrice float64
		var currentOldPrice float64
		var isOnSale bool
		switch rawCategory.StoreId {
		case 1:
			currentPrice, currentOldPrice, isOnSale = foxtrot.ParsePrice(rawItem.RawItemURL)
			break
		case 2:
			currentPrice, currentOldPrice, isOnSale = rozetka.ParsePrice(rawItem.RawItemURL)
			break
		}

		if currentPrice != 0 && (currentPrice != rawItem.RawPrice || !isPriceHistoryInitialised(db, item.Id)) {
			priceHistory := CoreStructs.PriceHistory{
				ItemId: item.Id,
				Price:  currentPrice,
				Date:   time.Now(),
			}

			insertPriceHistory(priceHistory)

			if isOnSale == true {
				notifications.SendNotifications(db, item)
			}

			err := UpdateRawItemPrice(db, rawItem.Id, currentPrice, currentOldPrice, isOnSale)
			if err != nil {
				log.Println("Error in updating price of RawItem")
			}
		}

		time.Sleep(3 * time.Second)
	}
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
	for {
		db := sqlx.MustConnect("postgres", connectionString)
		defer db.Close()
		db.SetMaxOpenConns(1)
		db.SetMaxIdleConns(1)

		if lastDate, err := getLastDate(db); err != nil || (err == nil && time.Now().Add(-1*time.Hour*4).After(lastDate)) {
			watchdogIteration(db)
		}

		db.Close()
		time.Sleep(time.Hour*4 + 1*time.Minute)
	}
}
