import React from "react";
import CampaignList from "@/components/home/Campaign/CampaignList/CampaignList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export type Campaign = {
  campaign_id: string;
  dungeon_master: string;
  name: string;
  description: string;
  image: string;
  notes: string;
  status: string;
  sessions: any[] | null;
  images: string | null;
  users: any[] | null
};

const getCampaigns = async () => {
  const cookie = cookies().get("Session")?.value

  if (!cookie) {
    redirect("/landing")
  }

  const data: { campaigns: Campaign[], info: string } = {
    campaigns: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/campaigns/user", {
      headers: {
        Cookie: `Session=${cookie}`,
      }
    });
    data.campaigns = await response.json() || [];
    data.info = "Success";
  } catch (error: any) {
    data.info = error.message;
  }
  // console.log(data);
  
  return data;
};

const Campaigns = async () => {
  const data = await getCampaigns()
  return <CampaignList campaigns={data.campaigns} />;
}

export default Campaigns;
