package dao

import (
	"context"
	"database/sql"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"

	"github.com/jmoiron/sqlx"
)

type (
	hairstyle struct {
		db *sqlx.DB
	}
)

func NewHairStyle(db *sqlx.DB) repository.HairStyle {
	return &hairstyle{db: db}
}

func (r *hairstyle) Create(ctx context.Context, hairstyle *object.HairStyle) (sql.Result, error) {
	var create string
	var args []interface{}

	if hairstyle.ImageURL != nil && hairstyle.Description != nil {
		create = "INSERT INTO hairstyles (user_id, title, image_url, description) VALUES ($1, $2, $3, $4)"
		args = []interface{}{hairstyle.UserId, hairstyle.Title, *hairstyle.ImageURL, *hairstyle.Description}
	} else if hairstyle.ImageURL != nil {
		create = "INSERT INTO hairstyles (user_id, title, image_url) VALUES ($1, $2, $3)"
		args = []interface{}{hairstyle.UserId, hairstyle.Title, *hairstyle.ImageURL}
	} else if hairstyle.Description != nil {
		create = "INSERT INTO hairstyles (user_id, title, description) VALUES ($1, $2, $3)"
		args = []interface{}{hairstyle.UserId, hairstyle.Title, *hairstyle.Description}
	} else {
		create = "INSERT INTO hairstyles (user_id, title) VALUES ($1, $2)"
		args = []interface{}{hairstyle.UserId, hairstyle.Title}
	}

	result, err := r.db.ExecContext(ctx, create, args...)

	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *hairstyle) Retrieve(ctx context.Context, user_id string) ([]*object.HairStyle, error) {
	const retrieve = "SELECT id, user_id, image_url, title, description, created_at, updated_at FROM hairstyles WHERE user_id = $1 AND is_deleted = false"

	var rows *sql.Rows
	var err error
	rows, err = r.db.QueryContext(ctx, retrieve, user_id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		
		return nil, err
	}
	defer rows.Close()
	
	var result []*object.HairStyle

	for rows.Next() {
		var hairstyle object.HairStyle
		if err := rows.Scan(&hairstyle.Id, &hairstyle.UserId, &hairstyle.ImageURL, &hairstyle.Title, &hairstyle.Description, &hairstyle.CreatedAt, &hairstyle.UpdatedAt); err != nil {
			return nil, err
		}
		
		result = append(result, &hairstyle)
	}

	return result, nil
}

func (r *hairstyle) Delete(ctx context.Context, title string) error {
	const retrieveHairstyles = "SELECT * FROM hairstyles WHERE title = $1"
	const retrieveHairstyleHistory = "SELECT hairstyle_id FROM hairstyle_history WHERE hairstyle_id = $1"
	const delete = "DELETE FROM hairstyles WHERE title = $1"
	const update = "UPDATE hairstyles SET is_deleted = true WHERE title = $1"

	tx, err := r.db.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	// hairstylesからidを取得
	hairstyle := object.HairStyle{}
	if err := tx.QueryRowxContext(ctx, retrieveHairstyles, title).StructScan(&hairstyle); err != nil {
		tx.Rollback()
		return err
	}

	// hairstyle_historyからidを取得
	var historyId int
	if err := tx.QueryRowContext(ctx, retrieveHairstyleHistory, hairstyle.Id).Scan(&historyId); err != nil {
		if err == sql.ErrNoRows {
			// 物理削除
			if _, err := tx.ExecContext(ctx, delete, title); err != nil {
				tx.Rollback()
				return err
			}
			if err := deleteHairstyleImage(ctx, hairstyle); err != nil {
				tx.Rollback()
				return err
			}
		} else {
			tx.Rollback()
			return err
		}
	} else {
		// 論理削除
		if _, err := tx.ExecContext(ctx, update, title); err != nil {
			tx.Rollback()
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

