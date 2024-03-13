import React from 'react';
import styles from './CardCharacter.module.css';
import Image from 'next/image';
import Link from 'next/link';

export type CardCharacterProps = {
  img: string;
  name: string;
  level: number;
  color: string;
  icon: string;
  id: number;
}

const CardCharacter = ({ img, name, level, color, icon, id }: CardCharacterProps) => {
  return (
    <Link href={`/character/${id}`} className={styles.cardCharacter}>
      <section className={styles.image}><Image src={img} alt={name} fill={true} sizes='auto'/></section>
      <section className={styles.icon}><Image src={icon} alt={name} width={32} height={32}/></section>
      <section className={styles.information}>
        <div style={{backgroundColor: `${color}`}} className={styles.level}>
          <p>{level}</p>
        </div>
        <h3 className={styles.h3}>{name}</h3>
      </section>
    </Link>
  )
}

export default CardCharacter;