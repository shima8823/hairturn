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

	if ok, msg := isValid(&req); !ok {
		http.Error(w, msg, http.StatusBadRequest)
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

func isValid(req *object.HairStyle) (bool, string) {

	if req.Title == "" || len(req.Title) > 150 {
		return false, "title is invalid"
	}

	if req.ImageURL != nil && len(*req.ImageURL) > 150 {
		return false, "image url is invalid"
	}

	if req.Description != nil && len(*req.Description) > 150 {
		return false, "description is invalid"
	}

	return true, ""
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