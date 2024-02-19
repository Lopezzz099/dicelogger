import HomeLayout from "@/components/home/Layout/HomeLayout";
import List from "@/components/sections/home/List/List";
import React from "react";
import itemsCardsCampaigns from "./itemsCardsCampaigns";
import CardCampaign from "@/components/home/CardCampaign/CardCampaign";

const Campaigns = () => {
  return (
    <HomeLayout>
      <h2>Campañas</h2>
      <hr />
      <List>
        {itemsCardsCampaigns.map((object, index) => (
          <CardCampaign
            key={index}
            img={object.img}
            title={object.title}
            description={object.text}
          />
        ))}
      </List>
    </HomeLayout>
  );
};

export default Campaigns;
