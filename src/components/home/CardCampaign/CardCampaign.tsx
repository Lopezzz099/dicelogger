import React from "react";
import styles from "./CardCampaign.module.css";
import Image from "next/image";
import Link from "next/link";

export type CardCampaignProps = {
  key: number;
  img: string;
  title: string;
  description: string;
};

const CardCampaign = ({ key, img, title, description }: CardCampaignProps) => {
  const truncatedDescription = description.length > 80 ? `${description.slice(0, 80)}...` : description;
  const campaignPath = `/campaigns/campaignDetail`;

  const handleCardClick = () => {
    localStorage.setItem(
      "campaignDetails",
      JSON.stringify({ img, title, description })
    );
  };

  return (
    <Link href={campaignPath} passHref onClick={handleCardClick} key={key}>
      <article className={styles.cardCampaign}>
        <section className={styles.image}>
          <Image src={img} alt={title} fill={true} />
        </section>
        <section className={styles.information}>
          <h3 className={styles.h3}>{title}</h3>
          <p className={styles.p}>{truncatedDescription}</p>
        </section>
      </article>
    </Link>
  );
};

export default CardCampaign;
