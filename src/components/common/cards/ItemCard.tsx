import React from 'react';
import styles from './ItemCard.module.css';

export type ItemCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ItemCard = ({ icon, title, description }: ItemCardProps) => {
  return (
    <article className={styles.card}>
      <section>{icon}</section>
      <section className={styles.information}>
        <h3>{title}</h3>
        <p>{description}</p>
      </section>
    </article>
  )
}

export default ItemCard;