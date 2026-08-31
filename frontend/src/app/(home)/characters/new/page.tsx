import React, { useState } from "react";
import CreateCharacter from "@/components/home/Character/CreateCharacter/CreateCharacter";
import useEffect from "react";
import { cookies } from "next/headers";
import getUserData from "@/services/getUserData";
import {
  getBackgrounds,
  getCharacterTemplate,
  getClasess,
  getRaces,
} from "./action";
import { redirect } from "next/navigation";

// const getRaces = async () => {
//   const data = {
//     races: [],
//     info: "",
//   };
//   try {
//     const response = await fetch(process.env.URL + "/api/races");
//     data.races = await response.json();
//     data.info = "Success";
//   } catch (error: any) {
//     data.info = error.message;
//   }
//   return data;
// };

// const getClasess = async () => {
//   const data = {
//     clasess: [],
//     info: "",
//   };
//   try {
//     const response = await fetch(process.env.URL + "/api/clasess");
//     data.clasess = await response.json();
//     data.info = "Success";
//   } catch (error: any) {
//     data.info = error.message;
//   }
//   return data;
// };

// const getBackgrounds = async () => {
//   const data = {
//     backgrounds: [],
//     info: "",
//   };
//   try {
//     const response = await fetch(process.env.URL + "/api/backgrounds");
//     data.backgrounds = await response.json();
//     data.info = "Success";
//   } catch (error: any) {
//     data.info = error.message;
//   }
//   return data;
// };

export const revalidate = 0;

type NewCharacterPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

const NewCharacter = async ({ searchParams }: NewCharacterPageProps) => {
  const dataRaces = await getRaces();
  const dataClasess = await getClasess();
  const dataBackgrounds = await getBackgrounds();
  const user = await getUserData(cookies);
  const characterTemplate = await getCharacterTemplate(
    user?.id,
    searchParams?.template as string
  );
  if (characterTemplate === false) {
    redirect("/suscription");
  }

  return (
    <CreateCharacter
      racesBack={dataRaces.races}
      clasessBack={dataClasess.clasess}
      user={user.id}
      backgroundsBack={dataBackgrounds.backgrounds}
      characterTemplate={characterTemplate}
    />
  );
};

export default NewCharacter;
