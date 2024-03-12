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
};

const CardCampaign = ({
  img,
  title,
  description,
  pro,
  template,
}: CardCampaignProps) => {
  const truncatedDescription =
    description.length > 80 ? `${description.slice(0, 80)}...` : description;
  const campaignPath = `/campaigns/campaignDetail`;

  const handleCardClick = () => {
    localStorage.setItem(
      "campaignDetails",
      JSON.stringify({ img, title, description })
    );
  };

  return (
    <Link
      href={campaignPath}
      passHref
      onClick={handleCardClick}
      className={styles.cardCampaign}
      style={{
        backgroundColor:
          template === true ? "var(--background)" : "var(--background-light)",
        border: template ? "1px solid var(--line-color)" : "",
      }}
    >
      {pro && (
        <div className={styles.pro}>
          <p>PRO</p>
        </div>
      )}
      <section className={styles.image}>
        <Image src={img} alt={title} fill={true} />
      </section>
      <section className={styles.information}>
        <h3 className={styles.h3}>{title}</h3>
        <p className={styles.p}>{truncatedDescription}</p>
      </section>
    </Link>
  );
};

export default CardCampaign;
