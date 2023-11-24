package dao

import (
	"context"
	"database/sql"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"

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

func (r *account) RetrieveReminderUser(ctx context.Context) ([]string, error) {
	// JSTの午前6時に実行される (UTCの21時)ため、CURRENT_DATE + 1を指定する
	const retrieve = "SELECT a.email FROM users u JOIN auth.users a ON u.id = a.id WHERE u.reminder_date = CURRENT_DATE + 1"
	rows, err := r.db.QueryContext(ctx, retrieve)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var emails []string
    for rows.Next() {
        var email string
        if err := rows.Scan(&email); err != nil {
            return nil, err
        }
        emails = append(emails, email)
    }

    if err = rows.Err(); err != nil {
        return nil, err
    }

    return emails, nil
}

func (r *account) Update(ctx context.Context, id string, reminderDate string) (sql.Result, error) {
	const update = "UPDATE users SET reminder_date = $1 WHERE id = $2"
	result, err := r.db.ExecContext(ctx, update, reminderDate, id)
	if err != nil {
		return nil, err
	}
	return result, nil
}
