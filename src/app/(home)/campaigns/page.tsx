'use client'

import List from "@/components/sections/home/List/List";
import React from "react";
import itemsCardsCampaigns from "./itemsCardsCampaigns";
import CardCampaign from "@/components/home/CardCampaign/CardCampaign";
import EmptyCampaignList from "@/components/home/EmptyList/EmptyCampaignList";
import CampaignFilter from "@/components/sections/home/List/CampaignFilter";

const Campaigns = () => {

  const [search, setSearch] = React.useState('')
  const filter = (campaign: any) => {
    return campaign.title.toLowerCase().includes(search.toLowerCase())
      || campaign.text.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <List search={search} 
    setSearch={setSearch} 
    addHref={'/campaigns/new'} 
    title={'Mis campañas'}
    filter={<CampaignFilter />}>
      {itemsCardsCampaigns.length > 0 && true ? (
        itemsCardsCampaigns.filter(filter).map((object, index) => (
          <CardCampaign
            key={index}
            img={object.img}
            title={object.title}
            description={object.text}
          />
        ))
      ) : (
        <EmptyCampaignList />
      )}
    </List>
  );
};

export default Campaigns;
