"use client";
import React, { useEffect, useState } from "react";
import CardCharacterCampaign from "../CardCharacterCampaign/CardCharacterCampaign";

export type CharacterProps = {
  icon: string;
  img: string;
  name: string;
  race: string;
  characterClass: string;
};

const getCharacters = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/characters");

    if (!response.ok) {
      throw new Error(
        `Error al obtener datos de personajes. Código de respuesta: ${response.status}`
      );
    }

    const characters: CharacterProps[] = await response.json();
    return { characters, info: "Success" };
  } catch (error: any) {
    return { characters: [], info: error.message };
  }
};

const GetAllCardsCharacters: React.FC = () => {
  const [data, setData] = useState<{
    characters: CharacterProps[];
    info: string;
  }>({
    characters: [],
    info: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharacters();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        overflowX: "scroll",
        padding: "40px",
        gap: "30px",
      }}
    >
      {data.characters.map((character, index) => (
        <CardCharacterCampaign
          key={index}
          icon={character.icon}
          img={character.img}
          name={character.name}
          race={character.race}
          characterClass={character.characterClass}
        />
      ))}
    </div>
  );
};

export default GetAllCardsCharacters;
