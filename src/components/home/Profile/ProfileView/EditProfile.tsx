import React from "react";
import styles from "./EditProfile.module.css";

const EditProfile = ({ img, setImg, open, setOpen, images }: any) => {
  const handleImageClick = (src: string) => {
    setImg(src);
    window.localStorage.setItem("pic", src);
    setOpen(!open);
  };

  return (
    <div className={styles.editProfileBody}>
      <div className={styles.selectPhoto}>
        <div className={`${styles.photoContainer} `}>
          {images.map((im: any) => (
            <img
              src={im.src}
              alt=""
              className={`${im.src === img ? styles.selected : ""} ${
                open ? styles.slideIn : ""
              }`}
              onClick={() => handleImageClick(im.src)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
