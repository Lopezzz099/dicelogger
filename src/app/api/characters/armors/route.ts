import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type Armor = {
  material: string | null;
  name: string | null;
  weight: number | null;
  price: number | null;
  description: string | null;
  category: string | null;
  protection_type: string | null;
  armor_class: number | null;
  strength: number | null;
  penalty: string | null;
  dex_bonus: string | null;
  campaign_id?: number | null;
}

type ArmorXCharacter = {
  character_data_id: number;
  armor: {
    armor_id: number
  }
  equipped: boolean;
}

export type ArmorReq = {
  character_data_id?: number | null;
  material: string | null;
  name: string | null;
  weight: number | null;
  price: number | null;
  description: string | null;
  category: string | null;
  protection_type: string | null;
  armor_class: number | null;
  strength: number | null;
  penalty: string | null;
  dex_bonus: string | null;
}

export async function POST(req: Request, res: NextApiResponse) {
  const body : ArmorReq = await req.json();
  const {
    character_data_id,
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
    material
  } = body;

  if (!character_data_id || !protection_type || !category || !name || !weight || !price || !material || !dex_bonus || !penalty || !armor_class || !strength) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }
  
  try {
    const armor = await createArmor({
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
      campaign_id: 0
    })

    const armorXCharacter = await createArmorXCharacter(armor.armor_id, character_data_id)

    return NextResponse.json(
      {
        message: "Armor created successfully",
        data: armorXCharacter,
      }
    );
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
    
}


const createArmor = async (armor: Armor) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/armor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(armor),
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

const createArmorXCharacter = async (armor_id: number, character_data_id: number) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/armor_character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character_data_id,
        armor: {
          armor_id
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