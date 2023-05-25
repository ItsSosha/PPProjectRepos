package notifications

import (
	"GoMicroservices/CoreStructs"
	"errors"
	"github.com/jmoiron/sqlx"
	expo "github.com/oliveroneill/exponent-server-sdk-golang/sdk"
	"log"
	"net/smtp"
	"strconv"
)

func getUserIdsByItem(db *sqlx.DB, itemId int64) ([]int64, error) {
	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	getString := "SELECT * FROM " + CoreStructs.UserItemTableName + " where \"ItemId\"=$1"

	objectList := []CoreStructs.UserItem{}
	err := db.Select(&objectList, getString, itemId)
	if err != nil {
		log.Println("Err to get structs from table UserItem")
		return nil, err
	}

	idsSlice := make([]int64, 0, len(objectList))

	for _, userItem := range objectList {
		idsSlice = append(idsSlice, userItem.UserId)
	}

	return idsSlice, nil
}

func getUsersFromUserIds(db *sqlx.DB, userIds []int64) []CoreStructs.User {
	if err := db.Ping(); err != nil {
		panic("Connection error!")
	}

	getString := "SELECT * FROM " + CoreStructs.UserTableName + " where \"Id\"=$1"

	users := make([]CoreStructs.User, 0, len(userIds))

	for _, userId := range userIds {
		user := CoreStructs.User{}
		err := db.Get(&user, getString, userId)
		if err != nil {
			log.Println("Err to get struct from table User")

		}

		users = append(users, user)
	}

	return users
}

func SendNotifications(db *sqlx.DB, item CoreStructs.Item) {
	client := expo.NewPushClient(nil)
	mailAuth := smtp.PlainAuth("", "anastasiia.shtanova@gmail.com", "ncotojtkocgaoqhz", "smtp.gmail.com")

	userIds, err := getUserIdsByItem(db, item.Id)
	if err != nil {
		log.Fatalln(err)
	}

	users := getUsersFromUserIds(db, userIds)
	if users == nil {
		log.Println(errors.New("Empty users slice"))
		return
	}

	for _, user := range users {
		// Sending mail

		err := smtp.SendMail("smtp.gmail.com:587",
			mailAuth,
			"Pricely",
			[]string{user.Email},
			[]byte("To: "+user.Email+"\r\n"+
				"Subject: Your favourite product is on sale!\r\n"+
				"\r\n"+
				"Please, check your https://pricely.tech wishlist."))

		if err != nil {
			log.Println("Err in sending mail")
			log.Println(err)
		}

		// Sending notification
		if user.NotificationToken == "" {
			continue
		}

		pushToken, err := expo.NewExponentPushToken(user.NotificationToken)
		if err != nil {
			log.Println("Err in checking PushToken")
			log.Println(err)
			continue
		}

		response, err := client.Publish(
			&expo.PushMessage{
				To:       []expo.ExponentPushToken{pushToken},
				Body:     "Tap to see details.",
				Data:     map[string]string{"itemId": strconv.Itoa(int(item.Id))},
				Sound:    "default",
				Title:    "Your favourite product is on sale!",
				Priority: expo.DefaultPriority,
			},
		)

		if err != nil {
			log.Println("Err in sending push!")
			log.Println(err)
			continue
		}
		if response.ValidateResponse() != nil {
			log.Println(response.PushMessage.To, "failed")
		}
	}
}
