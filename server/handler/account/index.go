package account

import (
	"encoding/json"
	"net/http"
	"zubohair/server/domain/object"
	"zubohair/server/domain/repository"
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

	_, err := h.AccountRepo.Create(r.Context(), req.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// TODO: json response
	
}