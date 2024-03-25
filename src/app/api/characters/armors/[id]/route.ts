import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Armor, ArmorReq } from "../route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      throw new Error("ID is missing");
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/armor_character/${params.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      return NextResponse.json(
        { message: "Armor deleted successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body: ArmorReq = await req.json();
  const {
    name,
    weight,
    price,
    description,
    category,
    penalty,
    protection_type,
    strength,
    armor_class,
    dex_bonus,
    material,
  } = body;

  if (!params.id) {
    return NextResponse.json({ message: "ID is missing" }, { status: 400 });
  }

  if (
    !protection_type ||
    !category ||
    !name ||
    !weight ||
    !price ||
    !material ||
    !dex_bonus ||
    !penalty ||
    !armor_class ||
    !strength
  ) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }

  try {
    const armor = await updateArmor(
      {
        name,
        weight,
        price,
        description,
        category,
        penalty,
        protection_type,
        strength,
        armor_class,
        dex_bonus,
        material,
        campaign_id: 0,
      },
      params.id
    );

    return NextResponse.json({
      message: "Armor updated successfully",
      data: armor,
    });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

const updateArmor = async (armor: Armor, id: string) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/armor/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(armor),
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
