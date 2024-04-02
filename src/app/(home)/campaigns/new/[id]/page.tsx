import React from "react";
import getUserData from "@/services/getUserData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CampaignDetails } from "@/app/(home)/campaign/[id]/page";
import UpdateCampaign from "@/components/home/Campaign/UdpateCampaign/UpdateCampaign";

const getCampaignById = async (campaignId?: string) => {
  if (!campaignId) {
    return null;
  }
  try {
    const res = await fetch("/api/campaigns/" + campaignId);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else throw new Error("Error fetching campaign");
  } catch (error) {
    return null;
  }
};

type NewCampaignPageProps = {
  params?: {
    id: string;
  };
};

const NewCampaignPage = async ({ params }: NewCampaignPageProps) => {
  const campaign: null | CampaignDetails = await getCampaignById(params?.id);
  const user = await getUserData(cookies);

  if (!campaign) {
    redirect("/");
  }

  if (campaign && user) {
    if (campaign.dungeon_master !== user.id) {
      console.log(1);
      redirect("/home");
    }
  }

  return (
    <>
      <UpdateCampaign
        campaign={campaign}
        user={user}
      />
    </>
  );
};

export default NewCampaignPage;
