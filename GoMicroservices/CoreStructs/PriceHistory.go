package CoreStructs

import "time"

const PriceHistoryTableName = "\"PriceHistories\""
const PriceHistoryInsertQuery = "INSERT INTO " + PriceHistoryTableName + " " +
	"(\"ItemId\", \"Price\", \"Date\") VALUES " +
	"(:ItemId, :Price, :Date)"

type PriceHistory struct {
	ItemId int64     `db:"ItemId"`
	Price  float64   `db:"Price"`
	Date   time.Time `db:"Date"`
}
