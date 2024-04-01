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
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    selectedRaceId,
    selectedAlignment,
    selectedClass,
    selectedSkills,
    selectedEquipment,
    selectedLanguages,
    selectedBackground,
    description,
    features,
    personality,
    ideals,
    bonds,
    flaws,
    stats,
  } = body;

  const jsonData = JSON.stringify({
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    selectedRaceId,
    selectedAlignment,
    selectedClass,
    selectedSkills,
    selectedEquipment,
    selectedLanguages,
    selectedBackground,
    description,
    features,
    personality,
    ideals,
    bonds,
    flaws,
    stats,
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
    }
  } catch (err) {
    console.error(err);
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
