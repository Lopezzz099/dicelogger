import React from 'react';
import styles from './CardCharacter.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { classes } from '@/services/hardcoded';

export type CardCharacterProps = {
  img: string;
  name: string;
  level?: number;
  color?: string;
  clase?: string;
  id: number;
};

const CardCharacter = ({ img, name, level, color, clase, id,  }: CardCharacterProps) => {
  return (
    <Link href={`/character/${id}`} className={styles.cardCharacter}>
      <section className={styles.image}><Image src={img} alt={name} fill={true} sizes='auto'/></section>
      <section className={styles.icon}>
        { clase && classes[clase]?.icon }
      </section>
      <section className={styles.information}>
        <div
          style={{ backgroundColor: `var(--primary)` }}
          className={styles.level}
        >
          <p>{level}</p>
        </div>
        <h3 className={styles.h3}>{name}</h3>
      </section>
    </Link>
  );
};

export default CardCharacter;
