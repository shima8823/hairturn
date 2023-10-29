package server

import (
	"encoding/json"
	"net/http"
	"os"
	"zubohair/server/domain/object"
)

func Authenticate(w http.ResponseWriter,r *http.Request) (string, error) {
	apiURL := os.Getenv("API_URL")

	req, err := http.NewRequest("GET", apiURL + "/auth", nil)
	if err != nil {
		println("new request error")
		return "", err
	}
	cookie := r.Header.Get("Cookie")
	req.Header.Set("Cookie", cookie)
	client := &http.Client{}
    res, err := client.Do(req)
    if err != nil {
		println("client do error")
        return "", err
    }

	if res.StatusCode != http.StatusOK {
		println("status code error")
		return "", err
	}

// 	bodyBytes, _ := ioutil.ReadAll(res.Body)
// println(string(bodyBytes[:200])) // 最初の200バイトを表示

	print("res.Body:", res.Body)
	var data object.Auth
	if err := json.NewDecoder(res.Body).Decode(&data); err != nil {
		println("json decode error: ", err.Error()	)
		return "", err
	}

	println("user_id:", data.UserID)
	return data.UserID, nil
}