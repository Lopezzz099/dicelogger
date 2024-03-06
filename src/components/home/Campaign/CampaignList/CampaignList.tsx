"use client";

import CampaignFilter from "@/components/home/List/CampaignFilter";
import List from "@/components/home/List/List";
import { useState } from "react";
import CardCampaign from "../CardCampaign/CardCampaign";
import EmptyCampaignList from "../../EmptyList/EmptyCampaignList";

type CampaignListProps = {
  campaigns: any;
};

const CampaignList = ({ campaigns }: CampaignListProps) => {
  const [search, setSearch] = useState("");
  const filter = (campaign: any) => {
    return (
      campaign.title.toLowerCase().includes(search.toLowerCase()) ||
      campaign.text.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <List
      search={search}
      setSearch={setSearch}
      addHref={"/campaigns/new"}
      title={"Mis campañas"}
      filter={<CampaignFilter />}
    >
      {campaigns.length > 0 && true ? (
        campaigns
          .filter(filter)
          .map((object: any, index: number) => (
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

export default CampaignList;
