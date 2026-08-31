import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const id = req.url ? req.url.split("/").pop() : undefined;
    // console.log(id)

    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/character/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response)

    if (!response.ok) {
      throw new Error("Token is missing or request failed");
    }

    const character = await response.json();
    // console.log(character)
    return NextResponse.json(character, { status: 200 });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const id = req.url ? req.url.split("/").pop() : undefined;
    // console.log(id)

    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/character/${id}`, {
      method: "DELETE",
    });
    // console.log(response)

    if (response.ok) {
      return NextResponse.json(
        { message: "Character deleted successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // const id = req.url ? req.url.split("/").pop() : undefined;
    // console.log(id)
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
      class: { class_id },
      background: { background_id },
      story,
      img,
      str,
      dex,
      int,
      con,
      wiz,
      cha,
      hitpoints,
      hit_dice,
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
      class: { class_id },
      background: { background_id },
      story,
      img,
      str,
      dex,
      int,
      con,
      wiz,
      cha,
      hitpoints,
      hit_dice,
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

    if (!params.id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/character/${params.id}`,
      {
        method: "PUT",
        body: jsonData,
      }
    );
    // console.log(response)

    if (response.ok) {
      return NextResponse.json(
        { message: "Character edited successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
