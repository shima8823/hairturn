package dao

import (
	"context"
	"database/sql"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"

	"github.com/jmoiron/sqlx"
)

type (
	hairstyleHistory struct {
		db *sqlx.DB
	}
)

func NewHairStyleHistory(db *sqlx.DB) repository.HairStyleHistory {
	return &hairstyleHistory{db: db}
}

func (r *hairstyleHistory) Create(ctx context.Context, hairstyleHistory *object.HairStyleHistory) (sql.Result, error) {
	const create = "INSERT INTO hairstyle_history (user_id, hairstyle_id) VALUES ($1, $2)"

	res, err := r.db.ExecContext(ctx, create, hairstyleHistory.UserId, hairstyleHistory.HairstyleId)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (r *hairstyleHistory) Retrieve(ctx context.Context, user_id string) ([]*object.HairStyle, error) {
	// N+1問題
	// hairstyle_historyからuser_idを元にhairstyle_idを取得
	// hairstyle_idを元にhairstylesからhairstyleを取得
	// hairstyleを返す

	// hairstylesのcreated_atをhairstyle_historyのcreated_atを置換している
	const retrieve = "SELECT hairstyles.id, hairstyles.user_id, hairstyles.image_url, hairstyles.title, hairstyles.description, hairstyle_history.created_at, hairstyles.updated_at FROM hairstyles INNER JOIN hairstyle_history ON hairstyles.id = hairstyle_history.hairstyle_id WHERE hairstyle_history.user_id = $1"

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

	var res []*object.HairStyle

	for rows.Next() {
		var hairstyle object.HairStyle
		if err := rows.Scan(&hairstyle.Id, &hairstyle.UserId, &hairstyle.ImageURL, &hairstyle.Title, &hairstyle.Description, &hairstyle.CreatedAt, &hairstyle.UpdatedAt); err != nil {
			return nil, err
		}
		res = append(res, &hairstyle)
	}
	
	return res, nil
}
