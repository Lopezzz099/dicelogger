import NewCampaign from "@/components/home/Campaign/NewCampaign/NewCampaign";
import React from "react";
import getUserData from "@/services/getUserData";
import { cookies } from "next/headers";
import { campaignTemplates } from "../templates/campaignTemplates";
import { getIsUserSubscribed } from "@/services/getIsSubscribed";
import { redirect } from "next/navigation";

const getCampaignTemplate = async (userId?: string, templateId?: string) => {
  if (!templateId || !userId) {
    console.log(templateId, userId);
    return null;
  }

  const campaignTemplate = campaignTemplates.find(
    (c) => c.campaign_id === parseInt(templateId)
  );
  if (!campaignTemplate) return null;

  if (campaignTemplate.pro) {
    try {
      const res = await getIsUserSubscribed(cookies);
      if (res) {
        return campaignTemplate;
      } else {
        return false
      }
    } catch (error) {
      return null;
    }
  }

  return campaignTemplate;
};

type NewCampaignPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

const NewCampaignPage = async ({ searchParams }: NewCampaignPageProps) => {
  const user = await getUserData(cookies);
  const campaignTemplate = await getCampaignTemplate(
    user?.id,
    searchParams?.template as string
  );

  if (campaignTemplate === false) {
    redirect("/suscription");
  }

  return (
    <>
      <NewCampaign template={campaignTemplate} />
    </>
  );
};

export default NewCampaignPage;
