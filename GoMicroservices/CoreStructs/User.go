package CoreStructs

const UserTableName = "\"Users\""

type User struct {
	Id                int64  `db:"Id"`
	Email             string `db:"Email"`
	Surname           string `db:"Surname"`
	IsAdmin           bool   `db:"IsAdmin"`
	FirstName         string `db:"FirstName"`
	PictureLink       string `db:"PictureLink"`
	NotificationToken string `db:"NotificationToken"`
}
