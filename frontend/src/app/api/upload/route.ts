import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Sube el archivo a Cloudinary usando "signed upload": el servidor firma
// el pedido con el API secret (que nunca sale de acá) y Cloudinary valida
// esa firma. Nada de esto corre en el navegador.
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No se envió ningún archivo" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Faltan variables de Cloudinary");
      return NextResponse.json({ message: "Error de configuración del servidor" }, { status: 500 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = uuidv4();

    // Cloudinary exige firmar (en orden alfabético) todos los parámetros
    // que se envían, salvo file/api_key/signature. Acá solo mandamos
    // public_id y timestamp, así que la firma cubre justo esos dos.
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("public_id", publicId);
    cloudinaryForm.append("timestamp", String(timestamp));
    cloudinaryForm.append("api_key", apiKey);
    cloudinaryForm.append("signature", signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cloudinaryForm }
    );

    const data = await uploadResponse.json();

    if (!uploadResponse.ok) {
      console.error("Error subiendo a Cloudinary:", data);
      return NextResponse.json({ message: "Error al subir el archivo" }, { status: 500 });
    }

    return NextResponse.json({ url: data.secure_url as string }, { status: 200 });
  } catch (error) {
    console.error("Error subiendo a Cloudinary:", error);
    return NextResponse.json({ message: "Error al subir el archivo" }, { status: 500 });
  }
}
