package genericDb

import (
	"github.com/jmoiron/sqlx"
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

//func checkAndInsert(db *sqlx.DB, insertQuery string, getQuery string, object any) error {
//}
