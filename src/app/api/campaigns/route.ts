import type { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type CampaignReq = {
  dungeonMaster?: string;
  name: string;
  description: string;
  image: string;
  notes: string | null;
  status: string | null;
  images: string | null;
};

export async function POST(req: Request, res: NextApiResponse) {  
  console.log(1);
  
  const body: CampaignReq = await req.json();
  const {
    name,
    description,
    image,
    notes,
    status,
    images
  } = body
  
  console.log(2);
  if (!name || !description || !image) {
    console.log("Required fields must be filled");
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }
    
  try {
    const campaign = {
      dungeon_master: "",
      name,
      description,
      image,
      notes,
      status,
      images
    }

    console.log(3);

    const response = await fetch(process.env.BACKEND_URL + "/campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "Session=" + cookies().get("Session")?.value
      },
      body: JSON.stringify(campaign),
    })

    console.log(4);

    if (response.ok) {
      const data = await response.json();
      console.log(5);
      return NextResponse.json(data, { status: response.status });
    } else {
      console.log(6);
      throw new Error("Request failed with status " + response.status);
    }

  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }

}
