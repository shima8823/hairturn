package repository

import (
	"context"
	"database/sql"
	"zubohair/server/domain/object"
)

type HairStyle interface {
	Create(ctx context.Context, hairstyle *object.HairStyle) (sql.Result, error)
	Retrieve(ctx context.Context, user_id string) ([]*object.HairStyle, error)
}