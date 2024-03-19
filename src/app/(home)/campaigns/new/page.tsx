"use client";

import React, { useEffect, useState } from "react";
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
import Delete from "@/components/icons/ui/Delete";
import { useRouter } from "next/navigation";

interface CampaignDetailsTemplate {
  img: string;
  title: string;
  description: string;
}

const NewCampaign = () => {
  const [campaignDetailsTemplate, setCampaignDetailsTemplate] = useState<
    CampaignDetailsTemplate | undefined
  >();

  useEffect(() => {
    const campaignDetailsTemplateString = localStorage.getItem(
      "campaignDetailsTemplate"
    );

    if (campaignDetailsTemplateString) {
      const parsedDetails = JSON.parse(campaignDetailsTemplateString);
      setCampaignDetailsTemplate(parsedDetails);
    }
  }, []);

  const router = useRouter();

  const [image, setImage] = useState<string>();
  const [titleCampaign, setTitleCampaign] = useState<string>();
  const [descriptionCampaign, setDescriptionCampaign] = useState<string>();

  const handleTitleCampaign = (value: string) => {
    setTitleCampaign(value)
  }

  const handleDescriptionCampaign = (value: string) => {
    setDescriptionCampaign(value)
  }

  useEffect(() => {
    if (campaignDetailsTemplate) {
      setImage(campaignDetailsTemplate.img);
      setTitleCampaign(campaignDetailsTemplate.title);
      setDescriptionCampaign(campaignDetailsTemplate.description);
    }
  }, [campaignDetailsTemplate]);

  const [extraImages, setExtraImages] = useState<string[]>([]);

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivoImagen = event.target.files?.[0];

    if (archivoImagen) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result as string);
      };

      await new Promise((resolve) => reader.readAsDataURL(archivoImagen));
    }
  };

  const handleExtraImages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const archivos = event.target.files;
    let imagenes: string[] = [];
    if (archivos) {
      const readFile = (file: File) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });

      const promises = Array.from(archivos).map((file) => readFile(file));

      try {
        imagenes = await Promise.all(promises);
      } catch (error) {
        console.error("Error reading files:", error);
      }
      setExtraImages(imagenes);
    }
  };

  function generateUniqueId() {
    // Obtiene la marca de tiempo actual en milisegundos
    const timestamp = new Date().getTime();

    // Genera un número aleatorio entre 0 y 1000000
    const random = Math.floor(Math.random() * 1000000);

    // Combina la marca de tiempo y el número aleatorio para crear el ID
    const uniqueId = `${timestamp}${random}`;

    return uniqueId;
  }

  const id = generateUniqueId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageData = image as string;
    const nameValue = formData.get("nameCampaign") as string;
    const descriptionValue = formData.get("description") as string;

    localStorage.setItem(
      "campaignDetails",
      JSON.stringify({
        img: imageData,
        title: nameValue,
        description: descriptionValue,
      })
    );
    router.push(`/campaign/${id}`);
  };

  return (
    <NewLayout
      onSubmit={handleSubmit}
      title="Crear campaña"
      slug={[
        { label: "Campañas", href: "/campaigns" },
        { label: "Plantillas", href: "/campaigns/templates" },
        { label: "Formulario" },
      ]}
    >
      <FormCard>
        <div className={styles.section1}>
          <div className={styles.miniSection1}>
            <FormGroup>
              <label htmlFor="image">Imagen principal</label>
              <ImageInput name="image" onChange={handleImage} image={image} />
            </FormGroup>
            <FormGroup className={styles.miniMiniSection}>
              <MultipleImageInput
                setImages={setExtraImages}
                images={extraImages}
                onChange={handleExtraImages}
                name="extraImages"
              />
            </FormGroup>
          </div>
          <div className={styles.miniSection2}>
            <FormGroup>
              <label htmlFor="nameCampaign" className={styles.label}>
                Título
              </label>
              <Input
                type="text"
                name="nameCampaign"
                onChange={(e) => handleTitleCampaign(e.target.value)}
                value={titleCampaign}
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
                onChange={(e) => handleDescriptionCampaign(e.target.value)}
                value={descriptionCampaign}
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
