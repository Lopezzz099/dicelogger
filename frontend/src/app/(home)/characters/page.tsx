import React from "react";
import CharacterList from "@/components/home/Character/CharacterList/CharacterList";
import { cookies } from "next/headers";

export const revalidate = 0;

const getCharacters = async () => {
  const cookie = cookies().get("Session")?.value

  const data = {
    characters: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/characters/user", {
      headers: {
        Cookie: `Session=${cookie}`,
      }
    });
    data.characters = await response.json() || [];
    data.info = "Success";
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};


const Characters = async () => {
  const data = await getCharacters();

  return <CharacterList characters={data.characters} />;
};

export default Characters;
