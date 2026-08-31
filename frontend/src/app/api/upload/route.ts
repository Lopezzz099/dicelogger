import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

// Esta ruta corre en el servidor de Next.js (nunca en el navegador),
// así que estas credenciales NO se exponen al cliente. A diferencia de
// las variables NEXT_PUBLIC_*, estas nunca llegan al bundle de JS.
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No se envió ningún archivo" }, { status: 400 });
    }

    const uuid = uuidv4();
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `${uuid}-${file.name}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      })
    );

    const url = `https://${process.env.AWS_S3_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error subiendo a S3:", error);
    return NextResponse.json({ message: "Error al subir el archivo" }, { status: 500 });
  }
}
