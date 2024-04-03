"use client"

import Image from "next/image";
import React from "react";
import styles from "./CardCharacterCampaign.module.css";
import Link from "next/link";

export type CardCharacterCampaignProps = {
  id?: number;
  icon: React.ReactNode;
  img: string;
  name: string;
  race: string | undefined;
  characterClass: string | undefined;
  template?: boolean;
  pro?: boolean;
  width?: string;
  userSuscribed?: boolean;
};

const CardCharacterCampaign = ({
  id,
  icon,
  img,
  name,
  race,
  characterClass,
  template,
  pro,
  width,
  userSuscribed
}: CardCharacterCampaignProps) => {
  const articleProps: any = {};
  if (width) {
    articleProps["style"] = { minWidth: width };
  }

  // const campaignPath = `/characters/new`;
  const characterPath = id ? template ? pro && !userSuscribed ? "/suscription" :  `/characters/new?template=${id}` : `/character/${id}` : "#";
  const handleCardClick = () => {
    localStorage.setItem(
      "characterDetailsTemplate",
      JSON.stringify({ icon, img, name, race, characterClass })
    );
  };

  return template ? (
    <Link
      href={characterPath}
      passHref
      onClick={handleCardClick}
      className={styles.container}
      {...articleProps}
    >
      <div className={styles.icon}>
        {/* <Image
          src={icon}
          alt={characterClass ? characterClass : ""}
          width={template ? 31 : 18}
          height={template ? 31 : 18}
        /> */}
        {icon}
      </div>
      {pro && (
        <div className={styles.pro}>
          <p>PRO</p>
        </div>
      )}
      <div className={styles.img}>
        <Image
          src={img}
          alt={race ? race : ""}
          // width={template ? 255 : 145}
          // height={template ? 255 : 145}
          fill={true}
          sizes="auto"
        />
      </div>
      <div className={styles.containerInfo}>
        <p style={{ fontSize: template ? "20px" : "13px" }}>{name}</p>
        <p
          style={{
            fontSize: template ? "14px" : "11px",
            color: template ? "var(--text-light-70)" : "",
          }}
        >
          {race} - {characterClass}
        </p>
      </div>
    </Link>
  ) : (
    <article className={styles.container} {...articleProps}>
      <div className={styles.icon}>
        {icon}
      </div>
      {pro && (
        <div className={styles.pro}>
          <p>PRO</p>
        </div>
      )}
      <div className={styles.img}>
        <Image
          src={img}
          alt={race ? race : ""}
          // width={template ? 255 : 145}
          // height={template ? 255 : 145}
          fill={true}
          sizes="auto"
        />
      </div>
      <div className={styles.containerInfo}>
        <p style={{ fontSize: template ? "20px" : "16px" }}>{name}</p>
        <p
          style={{
            fontSize: template ? "14px" : "12px",
            color: template ? "var(--text-light-70)" : "",
          }}
        >
          {race} - {characterClass}
        </p>
      </div>
    </article>
  );
};

export default CardCharacterCampaign;
