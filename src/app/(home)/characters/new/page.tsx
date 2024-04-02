import React, { useState } from "react";
import CreateCharacter from "@/components/home/Character/CreateCharacter/CreateCharacter";
import useEffect from 'react';
import { cookies } from "next/headers";
import getUserData from "@/services/getUserData";
import { getBackgrounds, getClasess, getRaces } from "./action";

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

const NewCharacter = async () => {

  const dataRaces = await getRaces()
  const dataClasess = await getClasess()
  const dataBackgrounds = await getBackgrounds()
  const user = await getUserData(cookies)

  return (
    <CreateCharacter racesBack={dataRaces.races} clasessBack={dataClasess.clasess} user={user.id} backgroundsBack={dataBackgrounds.backgrounds}/>
  );
};

export default NewCharacter;
