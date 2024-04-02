import React from "react";
import CardCampaign from "../CardCampaign/CardCampaign";
import styles from "./CampaignTemplatesList.module.css";
import { CampaignTemplate } from "@/app/(home)/campaigns/templates/campaignTemplates";
import { cookies } from "next/headers";
import { getIsUserSubscribed } from "@/services/getIsSubscribed";

type CampaignTemplatesListProps = {
  campaignsTemplates: CampaignTemplate[];
};

const CampaignTemplatesList = async ({ campaignsTemplates }: CampaignTemplatesListProps) => {
  const userSuscribed = await getIsUserSubscribed(cookies)

  return (
    <div className={styles.items}>
      {campaignsTemplates.map((campaign) => (
        <CardCampaign
          key={campaign.campaign_id}
          id={campaign.campaign_id}
          img={campaign.image}
          title={campaign.name}
          description={campaign.description}
          pro={campaign.pro}
          template={true}
          userSuscribed={userSuscribed}
        />
      ))}
    </div>
  );
};

export default CampaignTemplatesList;
