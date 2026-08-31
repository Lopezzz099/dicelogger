package firebaseConnection

import (
	"fmt"
	"log"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

var (
	ctx = &gin.Context{}
)

func InitializeFirebaseApp() *firebase.App {
	var opt option.ClientOption

	// En Railway (y otras plataformas sin filesystem persistente) el JSON
	// de la cuenta de servicio se pega completo en la variable
	// FIREBASE_CREDENTIALS_JSON. En local seguimos soportando el archivo
	// serviceAccountKey.json de siempre.
	if credentialsJSON := os.Getenv("FIREBASE_CREDENTIALS_JSON"); credentialsJSON != "" {
		opt = option.WithCredentialsJSON([]byte(credentialsJSON))
	} else {
		credentialsFile := os.Getenv("FIREBASE_CREDENTIALS_FILE")
		if credentialsFile == "" {
			credentialsFile = "./serviceAccountKey.json"
		}
		opt = option.WithCredentialsFile(credentialsFile)
	}

	conf := &firebase.Config{
		ProjectID:     os.Getenv("FIREBASE_PROJECT_ID"),
		StorageBucket: os.Getenv("FIREBASE_STORAGE_BUCKET"),
	}

	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	fmt.Println("conectado a firebase")
	return app
}

func CreateFirebaseClient() *auth.Client {
	app := InitializeFirebaseApp()

	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	return client
}
