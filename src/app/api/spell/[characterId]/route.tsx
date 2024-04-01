import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: NextApiResponse) {
  const id = req.url ? req.url.split("/").pop() : undefined;

  const body = await req.json();
  const {
    name,
    description,
    range,
    ritual,
    duration,
    concentration,
    casting_time,
    level,
    damage_type,
    difficulty_class,
    aoe,
    school,
  } = body;

  try {
    const spell = await updateSpell(
      {
        name,
        description,
        range,
        ritual,
        duration,
        concentration,
        casting_time,
        level,
        damage_type,
        difficulty_class,
        aoe,
        school,
      },
      id
    );

    return NextResponse.json({
      message: "Spell updated successfully",
      data: spell,
    });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

const updateSpell = async (spell: any, id: any) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/spell/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spell),
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
