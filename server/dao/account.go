package dao

import (
	"context"
	"database/sql"
	"zubohair/server/domain/object"
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

func (r *account) Retrieve(ctx context.Context, id string) (*object.Account, error) {
	const retrive = "SELECT * FROM users WHERE id = $1"
	result := &object.Account{}
	if err := r.db.QueryRowContext(ctx, retrive, id).Scan(&result); err != nil {
		return nil, err
	}
	return result, nil
}

