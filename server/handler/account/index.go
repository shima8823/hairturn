package account

import (
	"encoding/json"
	"net/http"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"
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
