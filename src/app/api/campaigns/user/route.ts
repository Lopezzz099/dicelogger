import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {  
  const session = cookies().get("Session")?.value

  if (!session) {
    console.log(1);
    throw new Error("Token is missing");
  }
  
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/campaign/user`, {
      headers: {
        Cookie: `Session=${session}`,
      }
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}


export async function POST(req: Request, res: NextApiResponse) {
  const body: { userIds: string[], campaign_id: string } = await req.json();
  const {
    userIds,
    campaign_id
  } = body

  if (!userIds || userIds.length === 0) {
    return NextResponse.json(
      { message: "UserIds are required" },
      { status: 400 }
    );
  }

  if (!campaign_id) {
    return NextResponse.json(
      { message: "CampaignId is required" },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/user_campaign/friends/${campaign_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userIds),
    });
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
