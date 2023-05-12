package CoreStructs

import "database/sql"

const CategoryInsertQuery = "INSERT INTO \"RawCategories\" " +
	"(\"Id\", \"ParsedName\", \"StoreId\", \"RawCategoryURL\") VALUES " +
	"(:Id, :ParsedName, :StoreId, :RawCategoryURL)"

type RawCategory struct {
	Id             int64  `db:"Id"`
	ParsedName     string `db:"ParsedName"`
	StoreId        int64  `db:"StoreId"`
	CategoryId     sql.NullInt64
	RawCategoryURL string `db:"RawCategoryURL"`
}
