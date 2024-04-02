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
import { useRouter } from "next/navigation";
import { CampaignReq } from "@/app/api/campaigns/route";
import { uploadFileToS3 } from "@/services/s3Upload";
import { campaignTemplates } from "../templates/campaignTemplates";

interface CampaignDetailsTemplate {
  img: string;
  title: string;
  description: string;
}

const NewCampaign = () => {
  // const [campaignDetailsTemplate, setCampaignDetailsTemplate] = useState<
  //   CampaignDetailsTemplate | undefined
  // >();

  useEffect(() => {
    const urlSearchParmas = new URLSearchParams(window.location.search);
    const id = urlSearchParmas.get("template");
    if (!id) return
    const campaignTemplate = campaignTemplates.find(c => c.campaign_id === parseInt(id))
    if (!campaignTemplate) return
    setTitleCampaign(campaignTemplate.name)
    setDescriptionCampaign(campaignTemplate.description)
    setImage(campaignTemplate.image)
    setExtraImages(campaignTemplate.images)
  }, []);

  const router = useRouter();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [s3Image, setS3Image] = useState<File>();
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [s3ExtraImages, setS3ExtraImages] = useState<File[]>([]);
  const [titleCampaign, setTitleCampaign] = useState<string>("");
  const [descriptionCampaign, setDescriptionCampaign] = useState<string>("");

  const handleTitleCampaign = (value: string) => {
    setTitleCampaign(value);
  };

  const handleDescriptionCampaign = (value: string) => {
    setDescriptionCampaign(value);
  };

  // useEffect(() => {
  //   if (campaignDetailsTemplate) {
  //     setImage(campaignDetailsTemplate.img);
  //     setTitleCampaign(campaignDetailsTemplate.title);
  //     setDescriptionCampaign(campaignDetailsTemplate.description);
  //   }
  // }, [campaignDetailsTemplate]);

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setS3Image(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    } else {
      setImage(undefined)
    }
  };

  const handleExtraImages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const archivos = event.target.files;

    let imagenes: string[] = [];
    if (archivos) {
      const files = Array.from(archivos).map((file) => file);
      setS3ExtraImages(files);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("nameCampaign") as string;
    const descriptionValue = formData.get("description") as string;
    let mainImageURL: (string | null) = ""
    let newExtraImages: any = null;

    if (image && !s3Image) {
      mainImageURL = image
    } else {
      if (!s3Image) {
        setLoading(false);
        setError(true);
        return;
      }
  
      mainImageURL = await uploadFileToS3(s3Image);
    }
    
    if (!mainImageURL) {
      setLoading(false);
      setError(true);
      return;
    }
    
    if (extraImages.length > 0 && s3ExtraImages.length === 0) {
      newExtraImages = extraImages
    } else if (s3ExtraImages.length > 0) {
      const extraImagesPromise = s3ExtraImages.map(async image => {
        const url = await uploadFileToS3(image)
        return url
      })
  
      newExtraImages = await Promise.all(extraImagesPromise)
    }

    const campaign: CampaignReq = {
      name: nameValue,
      description: descriptionValue,
      image: mainImageURL,
      images: newExtraImages ? newExtraImages.join() : null,
      status: "active",
      notes: null,
    };
    
    await createCampaign(campaign);
  };

  const createCampaign = async (body: CampaignReq) => {
    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      setError(false);
      setLoading(false);
      router.push(`/campaign/${data.campaign_id}`);
    } else {
      setError(true);
      setLoading(false);
      console.log(response);
    }
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
        {error && (
          <p className={styles.error}>
            Algo salió mal. Asegurate de llenar todos los campos.
          </p>
        )}
      </FormCard>
      <Button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Crear campaña"}
      </Button>
    </NewLayout>
  );
};

export default NewCampaign;
