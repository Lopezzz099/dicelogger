import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Item, ItemReq } from "../route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      throw new Error("ID is missing");
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/item_character/${params.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      return NextResponse.json(
        { message: "Item deleted successfully" },
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
  const body: ItemReq = await req.json();
  const {
    name,
    weight,
    price,
    description,
    quantity,
    character_item_id,
    character_data_id
  } = body;

  if (!params.id) {
    return NextResponse.json({ message: "ID is missing" }, { status: 400 });
  }

  if (!character_item_id) {
    return NextResponse.json({ message: "characther_item_id is missing" }, { status: 400 });
  }

  if (!character_data_id) {
    return NextResponse.json({ message: "characther_data_id is missing" }, { status: 400 });
  }

  if (
    !name ||
    !price ||
    !quantity
  ) {
    return NextResponse.json(
      { message: "Required fields must be filled" },
      { status: 400 }
    );
  }

  try {
    const item = await updateItem(
      {
        name,
        weight,
        price,
        description,
        campaign_id: null,
      },
      params.id
    );

    const itemXCharacter = await updateItemXCharacter(item.item_id, character_data_id, quantity, character_item_id)

    return NextResponse.json({
      message: "Item updated successfully",
      data: itemXCharacter,
    });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

const updateItem = async (item: Item, id: string) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/item/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
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

const updateItemXCharacter = async (item_id: number, character_data_id: number, quantity: number, characther_item_id: number) => {  
  try {
    const response = await fetch(process.env.BACKEND_URL + "/item_character/" + characther_item_id, {
      method: "PUT",
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
      console.log("error", response);
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error(error)
  }
}
