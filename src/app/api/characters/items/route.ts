import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type Item = {
  name: string | null;
  weight: number | null;
  price: number | null;
  description: string | null;
  campaign_id?: number | null;
}

type ItemXCharacter = {
  character_data_id: number;
  item: {
    item_id: number
  }
  quantity: boolean;
}

export type ItemReq = {
  character_item_id?: number | null;
  character_data_id?: number | null;
  name: string | null;
  weight: number | null;
  price: number | null;
  description: string | null;
  quantity: number | null;
}

export async function POST(req: Request, res: NextApiResponse) {
  const body : ItemReq = await req.json();
  const {
    character_data_id,
    name,
    weight,
    price,
    description,
    quantity
  } = body;

  if (!character_data_id || !name || !weight || !price || !quantity) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }
  
  try {
    const item = await createItem({
      name,
      weight,
      price,
      description,
      campaign_id: 0
    })

    const itemXCharacter = await createItemXCharacter(item.item_id, character_data_id, quantity)

    return NextResponse.json(
      {
        message: "Item created successfully",
        data: itemXCharacter,
      }
    );
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
    
}

const createItem = async (item: Item) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
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

const createItemXCharacter = async (item_id: number, character_data_id: number, quantity: number) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/item_character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character_data_id,
        item: {
          item_id
        },
        quantity
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