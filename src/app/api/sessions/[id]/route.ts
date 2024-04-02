import { NextResponse } from "next/server";
import { SessionReq } from "../route";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { message: "Id is missing" },
      { status: 400 }
      );
    }
    
    const body: SessionReq = await req.json()
    const { start, end, description, current_enviroment, campaign_id } = body
    if (!start || !end || !description || !campaign_id) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(process.env.BACKEND_URL + "/session/" + params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start, end, description, campaign_id, current_enviroment
      })
    });

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
