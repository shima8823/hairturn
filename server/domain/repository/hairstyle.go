package repository

import (
	"context"
	"database/sql"
	"hairturn/server/domain/object"
)

type HairStyle interface {
	Create(ctx context.Context, hairstyle *object.HairStyle) (sql.Result, error)
	Retrieve(ctx context.Context, user_id string) ([]*object.HairStyle, error)
	Delete(ctx context.Context, title string) error
}