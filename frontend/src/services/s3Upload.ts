// Antes este archivo corría en el navegador y usaba credenciales de AWS
// con prefijo NEXT_PUBLIC_, lo que las exponía en el JS público del sitio.
// Ahora solo delega la subida real a la ruta de servidor /api/upload,
// que es la que tiene las credenciales (sin NEXT_PUBLIC_, nunca visibles
// para el cliente).
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
