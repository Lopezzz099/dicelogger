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
  const cookie = cookies().get("Session")?.value

  if (!cookie) {
    console.log(cookie);
    
    return NextResponse.json(
      { message: "Cookie is missing" },
      { status: 400 }
    );
  }

  const body: CampaignReq = await req.json();
  const {
    name,
    description,
    image,
    notes,
    status,
    images
  } = body
  
  if (!name || !description || !image) {
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

    console.log(campaign);
    console.log(cookie);

    const response = await fetch(process.env.BACKEND_URL + "/campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "Session=" + cookie
      },
      body: JSON.stringify(campaign),
    })

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      throw new Error("Request failed with status " + response.status);
    }

  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }

}
