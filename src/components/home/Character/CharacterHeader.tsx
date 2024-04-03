"use client";

import IconButton from "@/components/common/buttons/IconButton";
import styles from "./CharacterHeader.module.css";
import Delete from "@/components/icons/ui/Delete";
import Edit from "@/components/icons/ui/Edit";
import Image from "next/image";
import DoubleUp from "@/components/icons/ui/DoubleUp";
import { CharacterProps } from "./Character";
import { classes, races } from "@/services/hardcoded";
import { doubleUpCharacter, removeCharacter } from "./actions";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import getUserData from "@/services/getUserData";
import { useEffect, useState } from "react";


export function getRaceLabel(value: string) {
  const race = races.find((race) => race.value === value);
  return race ? race.label : "Desconocido";
}

export function getClassLabel(value: any) {
  const classObj = classes[value];
  return classObj ? classObj.label : "Desconocido";
}

const CharacterHeader: React.FC<CharacterProps> = ({ characterData }) => {
  // console.log(characterData.userid)
  const labelRaceName = getRaceLabel(characterData.race.name);

  const labelClassName = getClassLabel(characterData.class.name);

  const router = useRouter();
  const handleRemoveCharacter = (id: number) => {
    removeCharacter(id)
    router.push('/characters');
  }

  const handleEditCharacter = (id: number) => {
    router.push(`/character/${id}/edit`);
  }

  const handleDoubleUp = async () => {
    console.log(characterData.userid)
      const characterData1 = {
        user_id: characterData.userid.toString(),
        campaign_id: characterData.campaignid,
        name: characterData.name,
        age: characterData.age,
        hair: characterData.hair,
        eyes: characterData.eyes,
        skin: characterData.skin,
        height: characterData.height,
        weight: characterData.weight,
        race_id: characterData.race.race_id,
        alignment: characterData.alignment,
        class_id: characterData.class.class_id,
        background_id: characterData.background.background_id,
        story: characterData.story,
        img: characterData.img,
        str: characterData.str,
        dex: characterData.dex,
        int: characterData.int,
        con: characterData.con,
        wiz: characterData.wiz,
        cha: characterData.cha,
        hitpoints: characterData.hitpoints,
        hit_dice: characterData.hitdice,
        speed: characterData.speed,
        armorclass: characterData.armorclass,
        level: characterData.level + 1,
        exp: 0,
        items: null,
        weapons: null,
        armor: null,
        skills: null,
        features: null,
        spells: null,
        proficiencies: null,
      };
      // console.log("edit",characterData);
      // navigate to characters
      // router.push('/characters')
      try {
        await doubleUpCharacter(characterData.characterid, characterData1);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

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
            <p className={styles.race}>{labelRaceName}</p>
          </div>
          <p className={styles.class}>
            {labelClassName} nivel {characterData.level}
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <IconButton icon={<Delete />} onClick={() => handleRemoveCharacter(characterData.characterid)} primary={true} />
        <IconButton icon={<Edit />} onClick={() => handleEditCharacter(characterData.characterid)} primary={true} />
        <IconButton icon={<DoubleUp />} onClick={() => handleDoubleUp()} primary={true} />
      </div>
    </section>
  );
};

export default CharacterHeader;
