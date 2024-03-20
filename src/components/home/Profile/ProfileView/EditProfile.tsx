import React from "react";
import styles from "./EditProfile.module.css";
import Image from "next/image";
import ImageInput from "@/components/common/inputs/ImageInput/ImageInput";

const EditProfile = ({ img, setImg, open, setOpen, images }: any) => {
  const handleImageClick = (src: string) => {
    setImg(src);
    window.localStorage.setItem("pic", src);
    setOpen(!open);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) handleImageClick(URL.createObjectURL(e.target.files[0]))
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
            <button className={styles.imageButton} key={image.src} onClick={() => handleImageClick(image.src)}>
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
