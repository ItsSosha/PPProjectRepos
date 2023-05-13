package CoreStructs

const RawItemTableName = "\"RawItems\""
const RawItemInsertQuery = "INSERT INTO " + RawItemTableName + " " +
	"(\"Id\", \"Name\", \"RawPrice\", \"OldPrice\", \"IsOnSale\", \"RawItemURL\", \"RawCategoryId\", \"Description\", \"RawIconURL\") VALUES " +
	"(:Id, :Name, :RawPrice, :OldPrice, :IsOnSale, :RawItemURL, :RawCategoryId, :Description, :RawIconURL)"

type RawItem struct {
	Id            int64   `db:"Id"`
	Name          string  `db:"Name"`
	RawPrice      float64 `db:"RawPrice"`
	OldPrice      float64 `db:"OldPrice"`
	IsOnSale      bool    `db:"IsOnSale"`
	RawItemURL    string  `db:"RawItemURL"`
	RawCategoryId int64   `db:"RawCategoryId"`
	Description   string  `db:"Description"`
	RawIconURL    string  `db:"RawIconURL"`
}
