// El nombre de la función quedó como estaba (uploadFileToS3) para no tener
// que tocar los ~7 componentes que la importan, pero ahora sube a
// Cloudinary vía /api/upload, no a S3.
export const uploadFileToS3 = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.log("Error al subir el archivo:", await response.text());
      return null;
    }

    const data = await response.json();
    return data.url as string;
  } catch (error) {
    console.log(error);
    return null;
  }
};
