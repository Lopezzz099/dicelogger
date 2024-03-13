"use client";

import React from "react";
// import CardCampaign from "../CardCampaign/CardCampaign";
import styles from "./CharacterTemplatesList.module.css";
import CardCharacter from "../CardCharacter/CardCharacter";
import CardCharacterCampaign from "../../Campaign/CardCharacterCampaign/CardCharacterCampaign";

type CharacterTemplatesListProps = {
  charactersTemplates: any;
};

const CharacterTemplatesList = ({
  charactersTemplates,
}: CharacterTemplatesListProps) => {
  return (
    <div className={styles.items}>
      {charactersTemplates.map((object: any, index: number) => (
        <CardCharacterCampaign
          key={index}
          icon={object.icon}
          img={object.img}
          name={object.name}
          race={object.race}
          characterClass={object.characterClass}
          template={true}
          pro={object.pro}
        />
      ))}
    </div>
  );
};

export default CharacterTemplatesList;
