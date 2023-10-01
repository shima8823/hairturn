package health

import (
	"encoding/json"
	"net/http"
	"zubohair/server/dao"
	"github.com/jmoiron/sqlx"
	"log"
)

type HealthResponse struct {
	Status string `json:"status"`
}

var db *sqlx.DB

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	db, err := dao.GetDBConnection(db)
	if err != nil {
		panic(err)
	}

	var version string
	err = db.QueryRow("SELECT version()").Scan(&version)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(version)


	response := HealthResponse{
		Status: "healthy",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
