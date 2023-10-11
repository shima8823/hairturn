package object

import "time"

type (
	HairStyle struct {
		Id int `json:"id" db:"id"`
		UserId string `json:"user_id" db:"user_id"`
		ImageURL *string `json:"image_url" db:"image_url"`
		Title string `json:"title" db:"title"`
		Description *string `json:"description" db:"description"`
		CreatedAt time.Time `json:"created_at" db:"created_at"`
		UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	}
)