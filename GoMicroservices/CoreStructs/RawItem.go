package CoreStructs

type RawItem struct {
	Id            int64
	Name          string
	RawPrice      float64
	OldPrice      float64
	IsOnSale      bool
	RawItemURL    string
	RawCategoryId int64
	Description   string
	RawIconURL    string
}
