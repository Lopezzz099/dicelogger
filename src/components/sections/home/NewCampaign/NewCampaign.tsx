"use client";

import Button from "@/components/common/buttons/Button";
import React, { useState } from "react";
import styles from "./NewCampaign.module.css";
import Add from "@/components/icons/ui/Add";
import Image from "next/image";
import Input from "@/components/common/inputs/Input";
import TextArea from "@/components/common/inputs/TextArea";

const NewCampaign = () => {
  const [imagen, setImagen] = useState<string | null>(null);

  const manejarSeleccionDeImagen = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const archivoImagen = event.target.files?.[0];

    if (archivoImagen) {
      const reader = new FileReader();

      reader.onload = () => {
        setImagen(reader.result as string);
      };

      await new Promise((resolve) => reader.readAsDataURL(archivoImagen));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("¡Formulario enviado!");
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className={styles.form}>
        <div className={styles.container}>
          <h3>Imagen de la campaña</h3>
          <input
            type="file"
            accept="image/*"
            onChange={manejarSeleccionDeImagen}
            style={{ display: "none" }}
            ref={(input) => input && (input.value = "")}
          />
          <button
            className={styles.add}
            type="button"
            onClick={() => {
              const fileInput = document.querySelector(
                "input[type=file]"
              ) as HTMLInputElement | null;
              if (fileInput) {
                fileInput.click();
              }
            }}
          >
            {imagen ? (
              <Image src={imagen} alt="Add" width={364} height={385} style={{filter: "none"}}/>
            ) : (
              <>
                <Image
                  src="/assets/home/campaigns/Rectangle_9.png"
                  alt="Add"
                  width={364}
                  height={385}
                />
                <Add />
              </>
            )}
          </button>
          <button className={styles.cargaImagenes} type="button">
            Cargar más imágenes{" "}
            <Image
              src="/assets/home/campaigns/Vector.png"
              alt="vector"
              width={26}
              height={31}
            />
          </button>
        </div>
        <div className={styles.containerForm}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="nameCampaign" className={styles.label}>
              Nombre de la campaña
            </label>
            <Input
              type="text"
              name="nameCampaign"
              placeholder="Escribe aquí..."
              required
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="description" className={styles.label}>
              Descripción
            </label>
            <TextArea
              name="description"
              placeholder="Escribe aquí..."
              required
              className={styles.textArea}
              height="325px"
            />
          </div>
        </div>
      </div>
      <div className={styles.containerButton}>
        <Button type="submit">Crear campaña</Button>
      </div>
    </form>
  );
};

export default NewCampaign;
