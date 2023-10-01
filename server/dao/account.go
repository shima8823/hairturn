package dao

import (
	"context"
	"database/sql"
	"zubohair/server/domain/repository"

	"github.com/jmoiron/sqlx"
)

type (
	account struct {
		db *sqlx.DB
	}
)

func NewAccount(db *sqlx.DB) repository.Account {
	return &account{db: db}
}

func (r *account) Create(ctx context.Context, id string) (sql.Result, error) {
	const create = "INSERT INTO users (id) VALUES ($1)"
	result, err := r.db.ExecContext(ctx, create, id)
	if err != nil {
		return nil, err
	}
	println("id:", id)
	return result, nil
}

