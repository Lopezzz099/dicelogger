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
};

const CardCharacterCampaign = ({
  key,
  icon,
  img,
  name,
  race,
  characterClass,
}: CardCharacterCampaignProps) => {
  return (
    <article className={styles.container}>
      <div className={styles.icon}>
        <Image src={icon} alt={characterClass} width={18} height={18} />
      </div>
      <div>
        <Image src={img} alt={race} width={145} height={145} />
      </div>
      <div className={styles.containerInfo}>
        <p className={styles.name}>{name}</p>
        <p className={styles.data}>
          {race} - {characterClass}
        </p>
      </div>
    </article>
  );
};

export default CardCharacterCampaign;
