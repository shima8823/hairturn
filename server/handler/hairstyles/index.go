package hairstyles

import (
	"encoding/json"
	"net/http"
	"hairturn/server"
	"hairturn/server/domain/object"
	"hairturn/server/domain/repository"
)

type Handler struct {
	HairStyleRepo repository.HairStyle
}

func NewHandler(hairStyleRepo repository.HairStyle) *Handler {
	return &Handler{
		HairStyleRepo: hairStyleRepo,
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

	records, err := h.HairStyleRepo.Retrieve(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if len(records) >= 6 {
		http.Error(w, "too many hairstyles", http.StatusBadRequest)
		return
	}

	var req object.HairStyle

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	req.UserId = id
	if req.Title == "" {
		http.Error(w, "title is required", http.StatusBadRequest)
		return
	}

	res, err := h.HairStyleRepo.Create(r.Context(), &req)
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

	res, err := h.HairStyleRepo.Retrieve(r.Context(), id)
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

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
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

	err = h.HairStyleRepo.Delete(r.Context(), req.Title)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}