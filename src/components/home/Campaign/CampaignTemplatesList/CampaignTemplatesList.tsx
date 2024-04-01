import React from "react";
import CardCampaign from "../CardCampaign/CardCampaign";
import styles from "./CampaignTemplatesList.module.css";
import { CampaignTemplate } from "@/app/(home)/campaigns/templates/campaignTemplates";
import { cookies } from "next/headers";

type CampaignTemplatesListProps = {
  campaignsTemplates: CampaignTemplate[];
};

const getIsUserSubscribed = async () => {
  const cookie = cookies().get("Session")?.value 
  if (!cookie) return false
  try {
    const res = await fetch(process.env.URL + "/api/my/subscribed", {
      headers: {
        Cookie: `Session=${cookie}`
      }
    });
    if (res.ok) {
      return true
    } else throw new Error("User is not subscribed");
  } catch (error: any) {
    return false
  }
};

const CampaignTemplatesList = async ({ campaignsTemplates }: CampaignTemplatesListProps) => {
  const userSuscribed = await getIsUserSubscribed()

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
