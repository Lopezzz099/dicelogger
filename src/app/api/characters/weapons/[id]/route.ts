import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Weapon, WeaponReq } from "../route";

export async function DELETE(req: Request, { params } : { params: { id: string } }) {
  try {
    if (!params.id) {
      throw new Error("ID is missing");
    }

    const res = await fetch(`${process.env.BACKEND_URL}/weapon_character/${params.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return NextResponse.json({ message: "Weapon deleted successfully" }, { status: 200 });
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

export async function PUT(req: Request, { params } : { params: { id: string } }) {
  const body : WeaponReq = await req.json();
  const {
    weapon_type,
    name,
    weight,
    price,
    description,
    category,
    reach,
    damage_type,
    damage,
    versatile_damage,
    ammunition,
  } = body;

  if (!params.id) {
    return NextResponse.json(
      { message: "ID is missing" },
      { status: 400 }
    );
  }

  if (!weapon_type || !category || !name || !weight || !price || !reach || !damage_type || !damage) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }
  
  try {
    const weapon = await updateWeapon({
      weapon_type,
      name,
      weight,
      price,
      category,
      reach,
      description,
      damage,
      versatile_damage,
      ammunition,
      damage_type,
      campaign_id: 0
    }, params.id)


    return NextResponse.json(
      {
        message: "Weapon updated successfully",
        data: weapon,
      }
    );
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
    
}

const updateWeapon = async (weapon: Weapon, id: string) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/weapon/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weapon),
    })

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error(error)
  }
}