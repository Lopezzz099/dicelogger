<<<<<<< HEAD
import React from "react";
import styles from "./CardCharacter.module.css";
import Image from "next/image";
import Link from "next/link";
=======
import React from 'react';
import styles from './CardCharacter.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { classes } from '@/services/hardcoded';
>>>>>>> 32db486f2fc261e4bc813406a80b021bc2c7e10a

export type CardCharacterProps = {
  img: string;
  name: string;
  level?: number;
  color?: string;
  icon: string;
  clase: string;
  id: number;
};

<<<<<<< HEAD
const CardCharacter = ({
  img,
  name,
  level,
  color,
  icon,
  clase,
  id,
}: CardCharacterProps) => {
  // console.log(class)
  return (
    <Link href={`/character/${id}`} className={styles.cardCharacter}>
      <section className={styles.image}>
        <Image src={img} alt={name} fill={true} sizes="auto" />
      </section>
      <section className={styles.icon}>
        <Image src={icon} alt={clase} width={32} height={32} />
=======
const CardCharacter = ({ img, name, level, color, icon, clase, id,  }: CardCharacterProps) => {
  console.log(clase)
  return (
    <Link href={`/character/${id}`} className={styles.cardCharacter}>
      <section className={styles.image}><Image src={img} alt={name} fill={true} sizes='auto'/></section>
      <section className={styles.icon}>
        { classes[clase].icon }
>>>>>>> 32db486f2fc261e4bc813406a80b021bc2c7e10a
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
