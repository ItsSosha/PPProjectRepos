package CoreStructs

const StoreInsertQuery = "INSERT INTO \"Stores\" " +
	"(\"Id\", \"Name\", \"URL\", \"IconURL\") VALUES " +
	"(:Id, :Name, :URL, :IconURL)"

type Store struct {
	Id      int64  `db:"Id"`
	Name    string `db:"Name"`
	URL     string `db:"URL"`
	IconURL string `db:"IconURL"`
}
