"use client"

import React from "react";
import styles from "./CardCampaign.module.css";
import Image from "next/image";
import Link from "next/link";

export type CardCampaignProps = {
  key: number;
  img: string;
  title: string;
  description: string;
  pro?: boolean;
  template?: boolean;
  id: number;
  userSuscribed?: boolean;
};



const CardCampaign = ({
  img,
  title,
  description,
  pro,
  template,
  id,
  userSuscribed
}: CardCampaignProps) => {
  const truncatedDescription =
    description.length > 80 ? `${description.slice(0, 80)}...` : description;
  const campaignPath = template ? pro && !userSuscribed ? "/suscription" :  `/campaigns/new?template=${id}` : `/campaign/${id}`;


  // const handleCardClick = () => {
    

  // };

  return (
    <Link
      href={campaignPath}
      passHref
      // onClick={handleCardClick}
      className={styles.cardCampaign}
      style={{
        backgroundColor:
          template === true ? "var(--background)" : "var(--background-light)",
      }}
    >
      {pro && (
        <div className={styles.pro}>
          <p>PRO</p>
        </div>
      )}
      <section className={styles.image}>
        <Image src={img} alt={title} fill={true} sizes="auto" />
      </section>
      <section className={styles.information}>
        <h3 className={styles.h3}>{title}</h3>
        <p className={styles.p}>{truncatedDescription}</p>
      </section>
    </Link>
  );
};

export default CardCampaign;
