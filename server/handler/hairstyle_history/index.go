package hairstyleHistory

import (
	"encoding/json"
	"net/http"
	"hairturn/server"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"
)

type Handler struct {
	HairStyleHistRepo repository.HairStyleHistory
}

func NewHandler(hairStyleHistRepo repository.HairStyleHistory) *Handler {
	return &Handler{
		HairStyleHistRepo: hairStyleHistRepo,
	}
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	id, err := server.Authenticate(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	var req object.HairStyle

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	if req.UserId != id {
		http.Error(w, "user id is not matched", http.StatusBadRequest)
		return
	}

	var hairstyleHistory object.HairStyleHistory
	hairstyleHistory.UserId = req.UserId
	hairstyleHistory.HairstyleId = req.Id

	res, err := h.HairStyleHistRepo.Create(r.Context(), &hairstyleHistory)
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

	w.WriteHeader(http.StatusCreated)

	// TODO: json response
}


func (h *Handler) Retrieve(w http.ResponseWriter, r *http.Request) {
	id, err := server.Authenticate(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	res, err := h.HairStyleHistRepo.Retrieve(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
