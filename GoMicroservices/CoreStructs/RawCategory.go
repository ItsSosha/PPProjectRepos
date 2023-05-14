package CoreStructs

import "database/sql"

const RawCategoryTableName = "\"RawCategories\""
const CategoryInsertQuery = "INSERT INTO " + RawCategoryTableName + " " +
	"(\"Id\", \"ParsedName\", \"StoreId\", \"RawCategoryURL\") VALUES " +
	"(:Id, :ParsedName, :StoreId, :RawCategoryURL)"

type RawCategory struct {
	Id             int64         `db:"Id"`
	ParsedName     string        `db:"ParsedName"`
	StoreId        int64         `db:"StoreId"`
	CategoryId     sql.NullInt64 `db:"CategoryId"`
	RawCategoryURL string        `db:"RawCategoryURL"`
}
