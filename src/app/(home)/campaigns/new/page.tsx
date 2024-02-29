"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import NewLayout from "@/components/home/NewLayout/NewLayout";
import Button from "@/components/common/buttons/Button";
import FormCard from "@/components/home/NewLayout/FormCard";
import Input from "@/components/common/inputs/Input";
import TextArea from "@/components/common/inputs/TextArea";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import ImageInput from "@/components/common/inputs/ImageInput/ImageInput";
import MultipleImageInput from "@/components/common/inputs/ImageInput/MultipleImageInput";

const NewCampaign = () => {

  const [imagen, setImagen] = useState<string>();

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
    <NewLayout title="Crear campaña" slug={[{ label: "Campañas", href: "/campaigns" }, { label: "Plantillas", href: "/campaigns/templates" }, { label: "Formulario" }]}>
      <FormCard>
        <div className={styles.section1}>
          <div className={styles.miniSection1}>
            <FormGroup>
              <label htmlFor="name">Imagen principal</label>
              <ImageInput onChange={manejarSeleccionDeImagen} image={imagen} />
            </FormGroup>
            <MultipleImageInput />
          </div>
          <div className={styles.miniSection2}>
            <FormGroup>
              <label htmlFor="nameCampaign" className={styles.label}>
                Título
              </label>
              <Input
                type="text"
                name="nameCampaign"
                placeholder="Escribe aquí..."
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="description" className={styles.label}>
                Historia
              </label>
              <TextArea
                name="description"
                placeholder="Escribe aquí..."
                required
                disableResize
                className={formStyles.textarea}
              />
            </FormGroup>
          </div>
        </div>
      </FormCard>
      <Button type="submit">Crear campaña</Button>
    </NewLayout>
  );
};

export default NewCampaign;
