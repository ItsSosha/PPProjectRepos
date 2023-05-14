package CoreStructs

const ItemTableName = "\"Items\""

type Item struct {
	Id        int64 `db:"Id"`
	RawItemId int64 `db:"RawItemId"`
}
