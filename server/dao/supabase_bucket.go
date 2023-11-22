package dao

import (
	"context"
	"errors"
	"hairturn/server/domain/object"
	"os"
	"strings"

	"github.com/supabase-community/storage-go"
)

func deleteHairstyleImage(ctx context.Context, hairstyle object.HairStyle) error {
	if hairstyle.ImageURL == nil {
		return nil
	}
	projectURL := os.Getenv("SUPABASE_URL")
	sec_key := os.Getenv("SUPABASE_SECRET_KEY")
	if projectURL == "" || sec_key == "" {
		return errors.New("SUPABASE_URL or SUPABASE_SECRET_KEY is not set")
	}

	parts := strings.Split(*hairstyle.ImageURL, "/")
	lenParts := len(parts)
	if lenParts < 2 {
		return errors.New("URL format is not valid")
	}
	imageURL := strings.Join(parts[lenParts-2:], "/")

	storageClient := storage_go.NewClient(projectURL + "/storage/v1", sec_key, nil)
	_, err := storageClient.RemoveFile("hairstyles", []string{imageURL})
	if err != nil {
		return err
	}

	return nil
}
