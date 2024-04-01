"use client";

import CampaignFilter from "@/components/home/List/CampaignFilter";
import List from "@/components/home/List/List";
import { useEffect, useState } from "react";
import CardCampaign from "../CardCampaign/CardCampaign";
import EmptyCampaignList from "../../EmptyList/EmptyCampaignList";
import { useUser } from "@/hooks/useUser";
import Loading from "@/app/(home)/loading";

type CampaignListProps = {
  campaigns: any;
};

const getCampaigns = async () => {
  const data = {
    campaigns: [],
    info: "",
  };
  try {
    const response = await fetch("/api/campaigns/user/" + "9gkCn77bjuPfLCwyiN24xg68Otw1");
    data.campaigns = await response.json();
    data.info = "Success";
    console.log(data);
    
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};

const CampaignList = () => {
  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState<any[] | false>(false);
  const filter = (campaign: any) => {
    return (
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    const getUserCampaigns = async () => {
      const result = await getCampaigns();
      setCampaigns(result.campaigns || []);
    }

    getUserCampaigns()
  }, [])

  // console.log(campaigns)
  return (
    campaigns ? <List
      search={search}
      setSearch={setSearch}
      addHref={"/campaigns/templates"}
      title={"Mis campañas"}
      filter={<CampaignFilter />}
      type='campaign'
    >
      {campaigns && (campaigns.length > 0 && true ? (
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
      ))}
    </List> : <Loading />
  );
};

export default CampaignList;
