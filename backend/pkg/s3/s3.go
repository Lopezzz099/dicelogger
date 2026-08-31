package s3

import (
	"bytes"
	"context"
	"encoding/base64"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/google/uuid"

	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var S3Client *s3.Client
var BucketName string
var bucketURL string

func bucketRegion() string {
	region := os.Getenv("AWS_REGION")
	if region == "" {
		region = "sa-east-1"
	}
	return region
}

func InitializeS3() {
	BucketName = os.Getenv("AWS_S3_NAME")
	bucketURL = "https://" + BucketName + ".s3." + bucketRegion() + ".amazonaws.com/"

	cfg, err := config.LoadDefaultConfig(context.TODO())

	if err != nil {
		log.Fatal(err)
	}

	S3Client = s3.NewFromConfig(cfg)
	log.Println("S3 Initialized")
}

func UploadBase64Image(base64ImageSrc string) (string, error) {
	name := uuid.New().String()

	i := strings.Index(base64ImageSrc, ";")
	index := strings.Index(base64ImageSrc, ",")
	fileType := base64ImageSrc[11:i]

	data, err := base64.StdEncoding.DecodeString(base64ImageSrc[index+1:])

	if err != nil {
		log.Println(err)
		return "", err
	}

	url := bucketURL + name + "." + fileType

	uploader := manager.NewUploader(S3Client)

	_, err = uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket:      aws.String(BucketName),
		Key:         aws.String(name + "." + fileType),
		Body:        bytes.NewReader(data),
		ACL:         "public-read",
		ContentType: aws.String("image/" + fileType),
	})

	if err != nil {
		log.Println(err)
		return "", err
	}

	return url, nil
}
