import React from 'react';
import styles from './CardCampaign.module.css';
import Image from 'next/image';

export type CardCampaignProps = {
  img: string;
  title: string;
  description: string;
}

const CardCampaign = ({ img, title, description }: CardCampaignProps) => {
  return (
    <article className={styles.cardCampaign}>
      <section><Image src={img} alt='title' width={300} height={212}/></section>
      <section className={styles.information}>
        <h3 className={styles.h3}>{title}</h3>
        <p className={styles.p}>{description}</p>
      </section>
    </article>
  )
}

export default CardCampaign;