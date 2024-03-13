import Image from "next/image";
import React from "react";
import styles from "./CardCharacterCampaign.module.css";

export type CardCharacterCampaignProps = {
  key: number;
  icon: string;
  img: string;
  name: string;
  race: string;
  characterClass: string;
  template?: boolean;
  pro?: boolean;
};

const CardCharacterCampaign = ({
  key,
  icon,
  img,
  name,
  race,
  characterClass,
  template,
  pro,
}: CardCharacterCampaignProps) => {
  return (
    <article
      className={styles.container}
      style={{ width: template ? "255px" : "145px" }}
    >
      <div className={styles.icon}>
        <Image
          src={icon}
          alt={characterClass}
          width={template ? 31 : 18}
          height={template ? 31 : 18}
        />
      </div>
      {pro && (
        <div className={styles.pro}>
          <p>PRO</p>
        </div>
      )}
      <div className={styles.img}>
        <Image
          src={img}
          alt={race}
          width={template ? 255 : 145}
          height={template ? 255 : 145}
        />
      </div>
      <div className={styles.containerInfo}>
        <p style={{fontSize: template ? "20px" : "13px"}}>{name}</p>
        <p style={{fontSize: template ? "14px" : "11px", color: template ? "var(--text-light-70)" : ""}}>
          {race} - {characterClass}
        </p>
      </div>
    </article>
  );
};

export default CardCharacterCampaign;
