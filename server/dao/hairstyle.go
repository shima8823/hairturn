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
	var create string
	var args []interface{}

	println("create hairstyle.ImageURL: ", *hairstyle.ImageURL, " hairstyle.Description: ", *hairstyle.Description)

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
		println("exec error", err.Error())
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

func (r *hairstyle) Delete(ctx context.Context, title string) error {
	const delete = "DELETE FROM hairstyles WHERE title = $1"
	res, err := r.db.ExecContext(ctx, delete, title)
	if err != nil {
		return err
	}
	
	affect, err := res.RowsAffected()
	if err != nil {
		return  err
	}

	if affect == 0 {
		return sql.ErrNoRows
	}
	
	return nil
}

