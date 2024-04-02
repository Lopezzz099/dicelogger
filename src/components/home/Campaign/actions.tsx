"use server";

import { CampaignReq } from "@/app/api/campaigns/route";
import { revalidatePath } from "next/cache";

export const updateCampaign = async (body: CampaignReq, campaignId: number) => {
  try {
    const response = await fetch(
      process.env.URL + "/api/campaigns/" + campaignId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const data = await response.json();
      revalidatePath(`/campaigns`);
      revalidatePath(`/campaigns/new/${campaignId}`);
      return data;
    } else {
      throw new Error("Error updating campaign");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createCampaign = async (body: CampaignReq) => {
  try {
    const response = await fetch(process.env.URL + "/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (response.ok) {
      const data = await response.json();
      revalidatePath("/campaigns");
      return data
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return null
  }
};

export const deleteCampaign = async (campaignId: number) => {
  // setDeleteLoading(true);
  try {
    const res = await fetch(
      process.env.URL + "/api/campaigns/" + campaignId,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      // setDeleteError(false);
      // setDeleteOpen(false);
      // router.push("/campaigns");
      revalidatePath("/campaigns")
      return true
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return false
  } 
};

