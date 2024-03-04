import React from "react";
import CampaignList from "@/components/home/CampaignList/CampaignList";

const getCampaigns = async () => {
  try {
    const response = await fetch(process.env.URL + '/api/campaigns');
    const campaigns = await response.json();
    return campaigns;  
  } catch (error) {
    console.error(error);
  }
  return [];
};

const Campaigns = async () => {

  // TODO: type campaigns
  const campaigns: any = await getCampaigns();

  return (
    <CampaignList campaigns={campaigns} />
  )
};

export default Campaigns;
