package repository

import (
	"context"
	"database/sql"
	"hairturn/server/domain/object"
)

type HairStyleHistory interface {
	Create(ctx context.Context, hairstyleHistory *object.HairStyleHistory) (sql.Result, error)
	Retrieve(ctx context.Context, user_id string) ([]*object.HairStyle, error)
}