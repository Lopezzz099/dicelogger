import Image from "next/image";
import React from "react";
import styles from "./CardCharacterCampaign.module.css"

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
      <div>
        <Image src={icon} alt={characterClass} />
      </div>
      <div>
        <Image src={img} alt={race} />
      </div>
      <div>
        <p>{name}</p>
        <p>{race} - {characterClass}</p>
      </div>
    </article>
  );
};

export default CardCharacterCampaign;
