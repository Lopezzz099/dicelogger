'use client'

import List from "@/components/sections/home/List/List";
import React from "react";
import itemsCardsCampaigns from "./itemsCardsCampaigns";
import CardCampaign from "@/components/home/CardCampaign/CardCampaign";

const Campaigns = () => {

  const [search, setSearch] = React.useState('')
  const filter = (campaign: any) => {
    return campaign.title.toLowerCase().includes(search.toLowerCase())
    || campaign.text.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <List search={search} setSearch={setSearch} title={'Mis campañas'}>
      {itemsCardsCampaigns.filter(filter).map((object, index) => (
        <CardCampaign
          key={index}
          img={object.img}
          title={object.title}
          description={object.text}
        />
      ))}
    </List>
  );
};

export default Campaigns;
