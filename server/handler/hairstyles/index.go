package hairstyles

import (
	"encoding/json"
	"net/http"
	"zubohair/server"
	"zubohair/server/domain/object"
	"zubohair/server/domain/repository"
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
		println("authenticate error")
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

	req.UserId = id
	println("req: ", req.ImageURL, req.Title, req.Description)
	_, err = h.HairStyleRepo.Create(r.Context(), &req)
	if err != nil {
		println("create error")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// TODO: json response
	w.WriteHeader(http.StatusCreated)



}


func (h *Handler) Retrieve(w http.ResponseWriter, r *http.Request) {
	id, err := server.Authenticate(w, r)
	if err != nil {
		println("authenticate error")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	res, err := h.HairStyleRepo.Retrieve(r.Context(), id)
	if err != nil {
		println("retrieve error")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(res); err != nil {
		println("encode error")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}