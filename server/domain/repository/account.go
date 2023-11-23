package repository

import (
	"context"
	"database/sql"
	"hairturn/server/domain/object"
)

type Account interface {
	Create(ctx context.Context, id string) (sql.Result, error)
	Retrieve(ctx context.Context, id string) (*object.Account, error)
	RetrieveReminderUser(ctx context.Context) ([]string, error)
}