package api

import (
	"net/http"
	"zubohair/server/dao"
	"zubohair/server/handler/hairstyles"

	"github.com/jmoiron/sqlx"
)
var db *sqlx.DB

func Handler(w http.ResponseWriter, r *http.Request) {
	db, err := dao.GetDBConnection(db)
	if err != nil {
		panic(err)
	}
	dao := dao.New(db)
	hairstyleHandler := hairstyles.NewHandler(dao.HairStyle())

	switch r.Method {
	case http.MethodGet:
		hairstyleHandler.Retrieve(w, r)
	case http.MethodPost:
		hairstyleHandler.Create(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}