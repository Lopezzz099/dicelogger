import React from "react";
import CampaignList from "@/components/home/Campaign/CampaignList/CampaignList";

const getCampaigns = async () => {
  const data = {
    campaigns: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/campaigns");
    data.campaigns = await response.json();
    data.info = "Success";
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};

const Campaigns = async () => {
  // TODO: type campaigns
  const data = await getCampaigns();
  console.log(data.info);

  return <CampaignList campaigns={data.campaigns} />;
};

export default Campaigns;
