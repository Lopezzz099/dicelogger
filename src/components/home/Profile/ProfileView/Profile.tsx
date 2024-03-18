"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import EditProfile from "./EditProfile";
import Right from "@/components/icons/ui/Right";
import Left from "@/components/icons/ui/Left";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [images, setImages] = useState([
    {
      alt: "Imagen 0",
      src: "/user.png",
    },
    {
      alt: "Imagen 1",
      src: "/assets/home/profile/img1.png",
    },
    {
      alt: "Imagen 2",
      src: "/assets/home/profile/img2.png",
    },
    {
      alt: "Imagen 3",
      src: "/assets/home/profile/img3.png",
    },
    {
      alt: "Imagen 4",
      src: "/assets/home/profile/img4.png",
    },
    {
      alt: "Imagen 5",
      src: "/assets/home/profile/img5.png",
    },
  ]);

  useEffect(() => {
    const pic = window.localStorage.getItem("pic");
    if (pic) {
      setImg(pic);
    } else {
      setImg("/user.png");
    }
  }, []);

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setImages: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        const newImages = [
          {
            src: imageDataUrl,
          },
          ...images,
        ];
        setImages(newImages);

        setImg(imageDataUrl);
        window.localStorage.setItem("pic", imageDataUrl);

        setOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className={styles.header}>
        <div className={styles.information}>
          <div className={styles.userDetails}>
            <div className={styles.image} onClick={() => setOpen(!open)}>
              <Image src={img} alt="Character" fill={true} sizes="auto" />
              <button className={styles.editBtn}>
                <img src="/assets/home/profile/edit.svg" alt="" />
              </button>
            </div>
            {open && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImages)}
                  style={{ display: "none" }}
                  id="fileInput"
                />

                <label htmlFor="fileInput" className={styles.uploadLabel}>
                  Cargar imagen
                </label>
              </>
            )}
          </div>

          {!open ? (
            <div className={styles.data}>
              <div className={styles.dataHeader}>
                <h2>John doe</h2>
                <p className={styles.race}>@johndoe17</p>
              </div>
              <p className={styles.class}>Miembro desde el 12 nov 2023</p>
            </div>
          ) : (
            <>
              <button
                className={styles.selectPhotoBtn}
                onClick={() => setOpen(!open)}
              >
                {open ? <Right /> : <Left />}
              </button>

              <EditProfile
                img={img}
                setImg={setImg}
                open={open}
                setOpen={setOpen}
                images={images}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
