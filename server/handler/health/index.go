package health

import (
	"encoding/json"
	"net/http"
)

// HealthResponse represents the structure of the health check response.
type HealthResponse struct {
	Status string `json:"status"`
}

// HealthCheckHandler handles the health check request.
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: 実際の健全性チェック処理をここに追加する (例: DB接続の確認)

	response := HealthResponse{
		Status: "healthy",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
