package object

import "time"

type (
	HairStyleHistory struct {
		Id int `json:"id" db:"id"`
		UserId string `json:"user_id" db:"user_id"`
		HairstyleId int `json:"hairstyle_id" db:"hairstyle_id"`
		CreatedAt time.Time `json:"created_at" db:"created_at"`
	}
)