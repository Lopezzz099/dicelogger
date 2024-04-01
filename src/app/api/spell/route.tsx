import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const {
    character_data_id,
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
    const spell = await createSpell({
      character_data_id,
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
    });
    const spellXCharacter = await createSpellXCharacter(
      spell.spell_id,
      character_data_id
    );

    return NextResponse.json({
      message: "Spell created successfully",
      data: spellXCharacter,
    });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

const createSpell = async (spell: any) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/spell", {
      method: "POST",
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

const createSpellXCharacter = async (
  spell_id: number,
  character_id: number
) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/characterXspell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character_id,

        spell_id,
      }),
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
