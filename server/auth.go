package server

import (
	"encoding/json"
	"net/http"
	"os"
	"hairturn/server/domain/object"
)

func Authenticate(w http.ResponseWriter,r *http.Request) (string, error) {
	apiURL := os.Getenv("APP_URL")

	req, err := http.NewRequest("GET", apiURL + "/auth", nil)
	if err != nil {
		return "", err
	}
	cookie := r.Header.Get("Cookie")
	req.Header.Set("Cookie", cookie)
	client := &http.Client{}
    res, err := client.Do(req)
    if err != nil {
        return "", err
    }

	if res.StatusCode != http.StatusOK {
		return "", err
	}

	var data object.Auth
	if err := json.NewDecoder(res.Body).Decode(&data); err != nil {
		return "", err
	}

	return data.UserID, nil
}