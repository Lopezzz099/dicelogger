"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import EditProfile from "./EditProfile";
import Right from "@/components/icons/ui/Right";
import Left from "@/components/icons/ui/Left";
import Edit from "@/components/icons/ui/Edit";
import Close from "@/components/icons/ui/Close";
import { uploadFileToS3 } from "@/services/s3Upload";

const Profile = ({user, updateImage}: {user: User, updateImage: (src: string) => void}) => {
  const [open, setOpen] = useState(false);
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


  return (
    <>
      <section className={styles.header}>
        <div className={styles.information + (open ? ' ' + styles.informationOpen : '')}>
          <div className={styles.userDetails}>
            <button className={styles.image} onClick={() => setOpen(!open)}>
              <Image src={user.image} alt="Character" fill={true} sizes="auto" />
              <div className={styles.edit}>
                <Edit />
              </div>
            </button>
            <div className={styles.data + (open ? ' ' + styles.hideData : '')}>
              <div className={styles.dataHeader}>
                <h2>{user.displayName}</h2>
                <p className={styles.username}>@{user.username}</p>
              </div>
              {/* <p className={styles.since}>Miembro desde el 12 nov 2023</p> */}
            </div>
          </div>
          <button
            className={styles.selectPhotoBtn + (!open ? ' ' + styles.hidden : '')}
            onClick={() => setOpen(!open)}
          >
            <Left />
          </button>
          <EditProfile
            img={user.image}
            handleImage={updateImage}
            open={open}
            setOpen={setOpen}
            images={images}
          />
        </div>
      </section>
    </>
  );
};

export default Profile;
