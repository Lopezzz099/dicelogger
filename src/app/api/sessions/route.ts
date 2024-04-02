import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type SessionReq = {
  session_id?: number;
  start: string;
  end?: string;
  description: string;
  campaign_id: number;
  current_enviroment: string | null;
};

export async function POST(req: Request, res: NextApiResponse) {
  const body: SessionReq = await req.json();
  const { start, description, campaign_id, current_enviroment } = body;
  
  if (!start || !description || !campaign_id) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
    
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start,
        end: null,
        description,
        campaign_id,
        current_enviroment
      })
    })

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
