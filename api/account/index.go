package api

import (
	"net/http"
	"hairturn/server/dao"
	"hairturn/server/handler/account"

	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func Handler(w http.ResponseWriter, r *http.Request) {
	db, err := dao.GetDBConnection(db)
	if err != nil {
		panic(err)
	}
	dao := dao.New(db)
	accountHandler := account.NewHandler(dao.Account())

	switch r.Method {
	case http.MethodPost:
		accountHandler.Create(w, r)
	case http.MethodPatch:
		accountHandler.Update(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
