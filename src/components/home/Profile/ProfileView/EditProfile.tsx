import React from "react";
import styles from "./EditProfile.module.css";
import Image from "next/image";
import ImageInput from "@/components/common/inputs/ImageInput/ImageInput";
import { uploadFileToS3 } from "@/services/s3Upload";

const EditProfile = ({ img, handleImage, open, setOpen, images }: any) => {
  const handleImageClick = async ({ src, file }: { src?: string, file?: File}) => {
    setOpen(!open);
    let image = src
    if (file) {
      image = await uploadFileToS3(file) as string;
    }
    console.log(image)
    handleImage(image);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) handleImageClick({ file: e.target.files[0] })
  }

  return (
    <div className={styles.editProfileBody + (!open ? ' ' + styles.hidden : '')}>
      <div className={styles.selectPhoto}>
        <div className={`${styles.photoContainer} `}>
          <ImageInput name="image"
            onChange={handleImageInput}
            className={`${styles.imageInput} ${open ? styles.slideIn : ""}`}
            image="" />
          {images.map((image: any) => (
            <button className={styles.imageButton} key={image.src} onClick={() => handleImageClick({ src: image.src})}>
              <Image
                src={image.src}
                alt=""
                fill={true}
                sizes="auto"
                className={`${image.src === img ? styles.selected : ""} ${open ? styles.slideIn : ""
                  }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
