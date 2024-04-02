import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { character_id, name, description } = body;

  try {
    const trait = await createTrait({
      character_id,
      name,
      description,
    });

    return NextResponse.json({
      message: "Spell created successfully",
      data: trait,
    });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

const createTrait = async (trait: any) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trait),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
};
