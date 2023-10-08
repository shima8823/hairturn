package dao

import (
	"context"
	"database/sql"
	"zubohair/server/domain/object"
	"zubohair/server/domain/repository"

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
	const create = "INSERT INTO hairstyles (user_id, image_url, title, description) VALUES ($1, $2, $3, $4)"

	result, err := r.db.ExecContext(ctx, create, hairstyle.UserId, hairstyle.ImageURL, hairstyle.Title, hairstyle.Description)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *hairstyle) Retrieve(ctx context.Context, user_id string) ([]*object.HairStyle, error) {
	const retrieve = "SELECT id, user_id, image_url, title, description, created_at, updated_at FROM hairstyles WHERE user_id = $1"

	var rows *sql.Rows
	var err error
	rows, err = r.db.QueryContext(ctx, retrieve, user_id)
	if err != nil {
		println("query context error")
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
			println("scan error")
			return nil, err
		}
		
		result = append(result, &hairstyle)
	}

	return result, nil
}

