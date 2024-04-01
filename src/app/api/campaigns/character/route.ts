import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type AddCharacterReq = {
  character_id: number;
  campaign_id: number;
};

export async function PUT(req: Request, res: NextApiResponse) {
  const body: AddCharacterReq = await req.json();
  const { character_id, campaign_id } = body;

  if (
    !campaign_id || !character_id
  ) {
    return NextResponse.json(
      { message: "Character id or camapign id is missing" },
      { status: 400 }
    );
  }

  const cookie = cookies().get("Session")?.value

  if (
    !cookie
  ) {
    return NextResponse.json(
      { message: "Cookie is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      process.env.BACKEND_URL + "/user_campaign/addCharacter",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `Session=${cookie}`
        },
        body: JSON.stringify({
          character_id,
          campaign_id,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
