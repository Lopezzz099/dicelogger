"use client";

import React, { useState } from "react";
import styles from "./UpdateCampaign.module.css";
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
import { CampaignDetails } from "@/app/(home)/campaign/[id]/page";
import { revalidatePath } from "next/cache";
import { updateCampaign } from "../actions";

type UpdateCampaignProps = {
  campaign: CampaignDetails;
};

const UpdateCampaign = ({ campaign }: UpdateCampaignProps) => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>(campaign ? campaign.image : "");
  const [s3Image, setS3Image] = useState<File>();
  const [extraImages, setExtraImages] = useState<string[]>(
    campaign.images && campaign.images.length > 0
      ? campaign.images.split(",")
      : []
  );
  const [s3ExtraImages, setS3ExtraImages] = useState<File[]>([]);
  const [titleCampaign, setTitleCampaign] = useState<string>(
    campaign.name || ""
  );
  const [descriptionCampaign, setDescriptionCampaign] = useState<string>(
    campaign.description || ""
  );
  const [dungeonMaster, setDungeonMaster] = useState(
    campaign.dungeon_master || ""
  );
  const [status, setStatus] = useState(campaign.status || "");
  const [notes, setNotes] = useState(campaign.notes || "");

  const handleTitleCampaign = (value: string) => {
    setTitleCampaign(value);
  };

  const handleDescriptionCampaign = (value: string) => {
    setDescriptionCampaign(value);
  };

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setS3Image(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    } else {
      setImage("");
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("nameCampaign") as string;
    const descriptionValue = formData.get("description") as string;
    let mainImageURL;
    let newExtraImages: (string | null)[] = [];

    if (!image?.includes("dicelogger-images")) {
      if (!s3Image) {
        setLoading(false);
        setError(true);
        return;
      } else {
        mainImageURL = await uploadFileToS3(s3Image);
        if (!mainImageURL) {
          setLoading(false);
          setError(true);
          return;
        }
      }
    }

    if (s3ExtraImages.length > 0) {
      const extraImagesPromise = s3ExtraImages.map(async (image) => {
        const url = await uploadFileToS3(image);
        return url;
      });

      newExtraImages = await Promise.all(extraImagesPromise);
      if (newExtraImages.includes(null)) {
        setLoading(false);
        setError(true);
        return;
      }
    }

    if ((!image && !mainImageURL) || !image) {
      setLoading(false);
      setError(true);
      return;
    }

    let newImagesString: string = "";

    if (extraImages.length > 0) {
      newImagesString = extraImages.join(",");
    }

    if (newExtraImages.length > 0) {
      newImagesString = newExtraImages.join(",");
    }

    const newCampaign: CampaignReq = {
      name: nameValue,
      description: descriptionValue,
      image: mainImageURL ? mainImageURL : image,
      images: newImagesString ? newImagesString : null,
      status,
      notes,
      dungeonMaster,
    };
    
    const res = await updateCampaign(newCampaign, campaign.campaign_id);
    if (res) {
      setError(false)
      setLoading(false)
      router.push(`/campaign/${campaign.campaign_id}`);
    } else {
      setError(true)
      setLoading(false)
    }
    
  };
  //   console.log(body);
    
  //   try {
  //     const response = await fetch("/api/campaigns/" + campaign.campaign_id, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       setError(false);
  //       setLoading(false);
  //       router.push(`/campaign/${data.campaign_id}`);
  //       revalidatePath(`/campaigns/new/${campaign.campaign_id}`);
  //     } else {
  //       throw new Error("Error updating campaign");
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     setError(true);
  //     setLoading(false);
  //   }
  // };

  return (
    <NewLayout
      onSubmit={handleUpdate}
      title="Editar campaña"
      slug={[
        {
          label: campaign.name,
          href: "/campaign/" + campaign.campaign_id,
        },
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
        {loading ? "Cargando..." : "Editar campaña"}
      </Button>
    </NewLayout>
  );
};

export default UpdateCampaign;
