package repository

import (
	"context"
	"database/sql"
	"zubohair/server/domain/object"
)

type Account interface {
	Create(ctx context.Context, id string) (sql.Result, error)
	Retrieve(ctx context.Context, id string) (*object.Account, error)
}