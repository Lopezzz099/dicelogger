import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type Weapon = {
  weapon_type: string | null;
  name: string | null;
  weight: number | null;
  price: number | null;
  description: string | null;
  category: string | null;
  reach: string | null;
  damage_type: string | null;
  damage: string | null;
  versatile_damage: string | null;
  ammunition: number | null;
  campaign_id?: number | null;
}

type WeaponXCharacter = {
  character_data_id: number;
  weapon: {
    weapon_id: number
  }
  equipped: boolean;
}

export type WeaponReq = {
  character_data_id?: number | null;
  weapon_type: string | null;
  name: string | null;
  weight: number | null;
  price: number | null;
  description: string | null;
  category: string | null;
  reach: string | null;
  damage_type: string | null;
  damage: string | null;
  versatile_damage: string | null;
  ammunition: number | null;
}

export async function POST(req: Request, res: NextApiResponse) {
  const body : WeaponReq = await req.json();
  const {
    character_data_id,
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

  if (!character_data_id || !weapon_type || !category || !name || !weight || !price || !reach || !damage_type || !damage) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }
  
  try {
    const weapon = await createWeapon({
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
      campaign_id: null
    })

    const weaponXCharacter = await createWeaponXCharacter(weapon.weapon_id, character_data_id)

    return NextResponse.json(
      {
        message: "Weapon created successfully",
        data: weaponXCharacter,
      }
    );
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
    
}


const createWeapon = async (weapon: Weapon) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/weapon", {
      method: "POST",
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

const createWeaponXCharacter = async (weapon_id: number, character_data_id: number) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/weapon_character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character_data_id,
        weapon: {
          weapon_id
        },
        equipped: false
      }),
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
