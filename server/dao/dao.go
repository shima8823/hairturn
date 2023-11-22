package dao

import (
	"hairturn/server/domain/repository"

	"github.com/jmoiron/sqlx"
)

type (
	DAO interface {
		Account() repository.Account
		HairStyle() repository.HairStyle
		HairStyleHistory() repository.HairStyleHistory
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

func (r *dao) HairStyle() repository.HairStyle {
	return NewHairStyle(r.db)
}

func (r *dao) HairStyleHistory() repository.HairStyleHistory {
	return NewHairStyleHistory(r.db)
}
