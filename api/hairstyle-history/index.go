package api

import (
	"net/http"
	"hairturn/server/dao"
	"hairturn/server/handler/hairstyle_history"

	"github.com/jmoiron/sqlx"
)
var db *sqlx.DB

func Handler(w http.ResponseWriter, r *http.Request) {
	db, err := dao.GetDBConnection(db)
	if err != nil {
		panic(err)
	}
	dao := dao.New(db)
	hairstyleHistoryHandler := hairstyleHistory.NewHandler(dao.HairStyleHistory())

	switch r.Method {
	case http.MethodGet:
		hairstyleHistoryHandler.Retrieve(w, r)
	case http.MethodPost:
		hairstyleHistoryHandler.Create(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}