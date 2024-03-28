"use client";

import IconButton from "@/components/common/buttons/IconButton";
import styles from "./CharacterHeader.module.css";
import Delete from "@/components/icons/ui/Delete";
import Edit from "@/components/icons/ui/Edit";
import Image from "next/image";
import DoubleUp from "@/components/icons/ui/DoubleUp";
import { CharacterProps } from "./Character";

const CharacterHeader: React.FC<CharacterProps> = ({ characterData }) => {
  return (
    <section className={styles.header}>
      <div className={styles.information}>
        <div className={styles.image}>
          <Image
            src={characterData.img}
            alt="Character"
            fill={true}
            sizes="auto"
          />
        </div>
        <div className={styles.data}>
          <div className={styles.dataHeader}>
            <h2>{characterData.name}</h2>
            <p className={styles.race}>{characterData.race.name}</p>
          </div>
          <p className={styles.class}>
            {characterData.class.name} nivel {characterData.level}
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <IconButton icon={<Delete />} onClick={() => {}} primary={true} />
        <IconButton icon={<Edit />} onClick={() => {}} primary={true} />
        <IconButton icon={<DoubleUp />} onClick={() => {}} primary={true} />
      </div>
    </section>
  );
};

export default CharacterHeader;
