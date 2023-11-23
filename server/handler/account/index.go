package account

import (
	"encoding/json"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"
	"net/http"
	"os"

	"github.com/resendlabs/resend-go"
)

type Handler struct {
	AccountRepo repository.Account
}

func NewHandler(accountRepo repository.Account) *Handler {
	return &Handler{
		AccountRepo: accountRepo,
	}
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var req object.Account

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res, err := h.AccountRepo.Create(r.Context(), req.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	affected, err := res.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if affected == 0 {
		http.Error(w, "failed to create", http.StatusInternalServerError)
		return
	}

	// TODO: json response
	
}

const maxEmails = 50

func (h *Handler) SendReminderMail(w http.ResponseWriter, r *http.Request) {
	if r.Header.Get("Authorization") != "Bearer " + os.Getenv("CRON_SECRET") {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		http.Error(w, "RESEND_API_KEY is not set", http.StatusInternalServerError)
		return
	}

	emails, err := h.AccountRepo.RetrieveReminderUser(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// maxEmails個ずつメールを送信する
	client := resend.NewClient(apiKey)

	for i := 0; i < len(emails); i += maxEmails {
		end := i+ maxEmails
		if end > len(emails) {
			end = len(emails)
		}

		params := &resend.SendEmailRequest{
			From:    "HairTurn <noreply@updates.hairturn.tokyo>",
			To:      emails[i:end],
			Subject: "髪型を変えてみませんか？",
			Html:   "<!DOCTYPE html>\n<html>\n<head>\n<title>HairTurn Reminder</title>\n<style>\n  body {\n    font-family: Arial, sans-serif;\n    background-color: #f4f4f4;\n    color: #333;\n    line-height: 1.6;\n  }\n  .container {\n    padding: 20px;\n    margin: auto;\n    width: 80%;\n    max-width: 600px;\n    background: #fff;\n    border: 1px solid #ddd;\n    border-radius: 10px;\n    text-align: center;\n  }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <h2>&#8203;今日は髪型変更の予定日です！</h2>\n   \n    <p><br>\n       髪型を変えると、気分も新たに、新しい自分に出会えるかもしれません。</p>\n    <p>今すぐアプリを開いて、新しい髪型を試しましょう！</p>\n    <p><a href=\"https://www.hairturn.tokyo/\" style=\"display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007BFF; border: none; border-radius: 5px; text-decoration: none;\">アプリを開く</a></p>\n    <p>今後ともHairTurnをよろしくお願いします。</p>\n  </div>\n</body>\n</html>",
			ReplyTo: "noreply@hairturn.tokyo",
		}
		_, err := client.Emails.Send(params)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

