import React from "react";
import CampaignList from "@/components/home/Campaign/CampaignList/CampaignList";

// export const revalidate = 0;

// const getCampaigns = async () => {
//   const data = {
//     campaigns: [],
//     info: "",
//   };
//   try {
//     const response = await fetch(process.env.URL + "/api/campaigns");
//     data.campaigns = await response.json();
//     data.info = "Success";
//   } catch (error: any) {
//     data.info = error.message;
//   }
//   return data;
// };

const Campaigns = async () => {
  return <CampaignList />;
};

export default Campaigns;
