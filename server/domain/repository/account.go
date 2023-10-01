package repository

import (
	"context"
	"database/sql"
)

type Account interface {
	Create(ctx context.Context, id string) (sql.Result, error)
}