import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/character`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const characters = await response.json();
      // console.log(characters)
      return NextResponse.json(characters, { status: 200 });
    } else {
      throw new Error("Token is missing or request failed");
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const {
    user_id,
    campaign_id,
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    race: { race_id },
    alignment,
    class: {class_id},
    background: {background_id},
    story,
    img,
    str,
    dex,
    int,
    con,
    wiz,
    cha,
    hitpoints,
    hitdice,
    speed,
    armorclass,
    level,
    exp,
    items,
    weapons,
    armor,
    skills,
    features,
    spells,
    proficiencies,
  } = body;

  const jsonData = JSON.stringify({
    user_id,
    campaign_id,
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    race: { race_id },
    alignment,
    class: {class_id},
    background: {background_id},
    story,
    img,
    str,
    dex,
    int,
    con,
    wiz,
    cha,
    hitpoints,
    hitdice,
    speed,
    armorclass,
    level,
    exp,
    items,
    weapons,
    armor,
    skills,
    features,
    spells,
    proficiencies,
  });
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (response.ok) {
      const character = await response.json();
      return NextResponse.json(character, { status: 200 });
    } else {
      throw new Error();
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// export async function POST(req: Request, res: NextApiResponse) {
//   try {
//     const response = await fetch(process.env.BACKEND_URL + "/user/jwt", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
//     if (response.ok) {
//       return NextResponse.json({ message: 'Retrieved' }, { status: 200 });
//     } else {
//       throw new Error('Token is missing');
//     }
//   } catch (err) {
//     return NextResponse.json({ message: 'Bad request' }, { status: 400 });
//   }

// }
