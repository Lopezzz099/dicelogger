import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
  },
});

export const uploadFileToS3 = async (file: File) => {
  try {
    const uuid = uuidv4()

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_NAME!,
      Key: `${uuid}-${file.name}`,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read"
    });
    await s3Client.send(command);
    return `https://dicelogger-images.s3.sa-east-1.amazonaws.com/${uuid}-${file.name}`
  } catch (error) {
    console.log(error);
    return null
  }
};


