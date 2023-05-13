package genericDb

import (
	"github.com/jmoiron/sqlx"
	"log"
	"strconv"
)

func Insert(db *sqlx.DB, query string, object any) error {
	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	_, err := db.NamedExec(query, object)
	if err != nil {
		return err
	}

	return nil
}

func GetById[T any](db *sqlx.DB, tableName string, id int64) (T, error) {
	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	getString := "SELECT * FROM " + tableName + " WHERE \"Id\"=$1"

	var object T
	err := db.Get(&object, getString, id)
	if err != nil {
		log.Println("Err to get struct with id " + strconv.Itoa(int(id)) + " from table " + tableName)
	}

	return object, err
}

func SelectAll[T any](db *sqlx.DB, tableName string) ([]T, error) {
	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	getString := "SELECT * FROM " + tableName

	objectList := []T{}
	err := db.Select(&objectList, getString)
	if err != nil {
		log.Println("Err to get structs from table " + tableName)
	}

	return objectList, err
}

//func checkAndInsert(db *sqlx.DB, insertQuery string, getQuery string, object any) error {
//}
