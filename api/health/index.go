package api

import (
	"net/http"
	"hairturn/server/handler/health"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	
	switch r.Method {
	case http.MethodGet:
		health.HealthCheckHandler(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}