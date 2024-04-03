import React, { useState } from "react";
// import CardCampaign from "../CardCampaign/CardCampaign";
import styles from "./CharacterTemplatesList.module.css";
import CardCharacter from "../CardCharacter/CardCharacter";
import CardCharacterCampaign from "../../Campaign/CardCharacterCampaign/CardCharacterCampaign";
import { Background, Clase, Race } from "../CreateCharacter/CreateCharacter";
import { classes, classesArray, races } from "@/services/hardcoded";
import { cookies } from "next/headers";
import { getIsUserSubscribed } from "@/services/getIsSubscribed";

type CharacterTemplatesListProps = {
  charactersTemplates: any;
  user: string;
  dataRaces: Race[];
  dataClasess: Clase[];
  dataBackgrounds: Background[];
};

const CharacterTemplatesList = async ({
  charactersTemplates,
  user,
  dataRaces,
  dataClasess,
  dataBackgrounds,
}: CharacterTemplatesListProps) => {
  const selectedClassesAndIcons = charactersTemplates.map((object: any) => {
    let selectedClass: string | undefined;
    let selectedClassIcon: any;

    dataClasess.forEach((clase) => {
      const foundClass = classesArray.find(
        (claseHarcoded) => claseHarcoded.value === clase.name
      );
      if (clase.class_id === object.class_id) {
        if (foundClass && foundClass.value === clase.name) {
          selectedClass = foundClass.label;
        }
        const objetoEncontrado = classesArray.find(
          (objeto) => objeto.value === clase.name
        );

        if (objetoEncontrado) {
          selectedClassIcon = objetoEncontrado.icon;
        }
      }
    });
    return { selectedClass, selectedClassIcon };
  });
  const userSuscribed = await getIsUserSubscribed(cookies)

  // Renderizar los elementos con la información calculada
  return (
    <div className={styles.items}>
      {charactersTemplates.map((object: any, index: number) => {
        let selectedRace: string | undefined;
        dataRaces.forEach((raza) => {
          const foundRace = races.find((race) => race.value === raza.name);
          // console.log(foundRace)
          if (foundRace && foundRace.value === raza.name) {
            selectedRace = foundRace.label;
          }
        });

        return (
          <CardCharacterCampaign
            key={index}
            id={object.character_id}
            icon={selectedClassesAndIcons[index].selectedClassIcon}
            img={object.img}
            name={object.name}
            race={selectedRace}
            characterClass={selectedClassesAndIcons[index].selectedClass}
            template={true}
            pro={object.pro}
            userSuscribed={userSuscribed}
          />
        );
      })}
    </div>
  );
};

export default CharacterTemplatesList;
