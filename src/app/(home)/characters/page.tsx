import React from "react";
import CharacterList from "@/components/home/Character/CharacterList/CharacterList";

export const revalidate = 0;

const getCharacters = async () => {
  const data = {
    characters: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/characters");
    data.characters = await response.json();
    data.info = "Success";
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};


const Characters = async () => {
  // TODO: type characters
  const data = await getCharacters();
  console.log(data);

  return <CharacterList characters={data.characters} />;
};

export default Characters;
