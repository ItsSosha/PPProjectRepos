package CoreStructs

const UserItemTableName = "\"UserItems\""

type UserItem struct {
	Id     int64 `db:"Id"`
	UserId int64 `db:"UserId"`
	ItemId int64 `db:"ItemId"`
}
