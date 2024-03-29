"use client";
import React, { useEffect, useState } from "react";
import CardCharacterCampaign from "../CardCharacterCampaign/CardCharacterCampaign";
import styles from './GetAllCardsCharacters.module.css';
import { CharacterCampaign } from "@/app/(home)/campaign/[id]/page";
import { classes } from "@/services/hardcoded";

// export type CharacterProps = {
//   icon: string;
//   img: string;
//   name: string;
//   race: string;
//   characterClass: string;
// };

// const getCharacters = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/characters");

//     if (!response.ok) {
//       throw new Error(
//         `Error al obtener datos de personajes. Código de respuesta: ${response.status}`
//       );
//     }

//     const characters: CharacterProps[] = await response.json();
//     return { characters, info: "Success" };
//   } catch (error: any) {
//     return { characters: [], info: error.message };
//   }
// };

export type GetAllCardsCharactersProps = {
  characters: CharacterCampaign[] | null;
}

const GetAllCardsCharacters: React.FC<GetAllCardsCharactersProps> = ({ characters }) => {
  // const [data, setData] = useState(characters);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getCharacters();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    // detect scrollbar and scorll the horizontal scrollbar
    const container = document.querySelector(`.${styles.container}`);
    if (container) {
      container.addEventListener("wheel", (e: any) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += (e.deltaY / 2);
        }
      });
    }
  }, [])

  return (
    <div
    className={styles.container}
    >
      {characters && characters.map((character, index) => (
        <CardCharacterCampaign
          key={index}
          icon={classes[character.class]?.icon}
          img={character.image_url}
          name={character.name}
          race={character.race}
          characterClass={character.class}
          width="8rem"
        />
      ))}
    </div>
  );
};

export default GetAllCardsCharacters;
