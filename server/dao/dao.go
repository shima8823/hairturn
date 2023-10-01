package dao

import (
	"zubohair/server/domain/repository"

	"github.com/jmoiron/sqlx"
)

type (
	DAO interface {
		Account() repository.Account

	}

	dao struct {
		db *sqlx.DB
	}
)

func New(db *sqlx.DB) DAO {
	return &dao{db: db}
	
}

func (r *dao) Account() repository.Account {
	return NewAccount(r.db)
}

