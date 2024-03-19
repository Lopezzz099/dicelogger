'use client'

import React from "react";
import CardCampaign from "../CardCampaign/CardCampaign";
import styles from "./CampaignTemplatesList.module.css";

type CampaignTemplatesListProps = {
  campaignsTemplates: any;
};

const CampaignTemplatesList = ({ campaignsTemplates }: CampaignTemplatesListProps) => {
  return (
    <div className={styles.items}>
      {campaignsTemplates.map((object: any, index: number) => (
        <CardCampaign
          key={index}
          id={index}
          img={object.img}
          title={object.title}
          description={object.text}
          pro={object.pro}
          template={true}
        />
      ))}
    </div>
  );
};

export default CampaignTemplatesList;
