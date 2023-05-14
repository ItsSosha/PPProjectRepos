package CoreStructs

const SpecInsertQuery = "INSERT INTO \"Specifications\" " +
	"(\"RawItemId\", \"Key\", \"Value\") VALUES " +
	"(:RawItemId, :Key, :Value)"

type Specification struct {
	RawItemId int64  `db:"RawItemId"`
	Key       string `db:"Key"`
	Value     string `db:"Value"`
}
