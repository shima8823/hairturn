package dao

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func GetDBConnection(db *sqlx.DB) (*sqlx.DB, error) {
	if db != nil {
		return db, nil
	}

	databaseURL := os.Getenv("DATABASE_URL")
	Conn, err := sqlx.Open("postgres", databaseURL)
	if err != nil {
		panic(err)
	}

	return Conn, nil
}
