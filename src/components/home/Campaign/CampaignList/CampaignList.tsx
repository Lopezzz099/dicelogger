"use client";

import List from "@/components/home/List/List";
import { useState } from "react";
import CardCampaign from "../CardCampaign/CardCampaign";
import EmptyCampaignList from "../../EmptyList/EmptyCampaignList";
import { Campaign } from "@/app/(home)/campaigns/page";

type CampaignListProps = {
  campaigns: Campaign[];
};

const CampaignList = ({ campaigns }: CampaignListProps) => {
  const [search, setSearch] = useState("");

  const filter = (campaign: any) => {
    return (
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <List
      search={search}
      setSearch={setSearch}
      addHref={"/campaigns/templates"}
      title={"Mis campañas"}
      // filter={<CampaignFilter />}
      type={campaigns.length > 0 ? "campaign" : "empty"}
    >
      {campaigns.length > 0 ? (
        campaigns
          .filter(filter)
          .map((campaign: any) => (
            <CardCampaign
              key={campaign.campaign_id}
              id={campaign.campaign_id}
              img={campaign.image}
              title={campaign.name}
              description={campaign.description}
            />
          ))
      ) : (
        <EmptyCampaignList />
      )}
    </List>
  );
};

export default CampaignList;
