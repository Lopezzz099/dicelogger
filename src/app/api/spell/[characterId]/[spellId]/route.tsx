import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const spell_id = req.url ? req.url.split("/").pop() : undefined;
    const character_id = req.url
      ? req.url.split("/").slice(-2, -1)[0]
      : undefined;
    console.log(
      `${process.env.BACKEND_URL}/characterXspell/delete?characterId=${character_id}&spellId=${spell_id}`
    );

    const res = await fetch(
      `${process.env.BACKEND_URL}/characterXspell/delete?characterId=${character_id}&spellId=${spell_id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      return NextResponse.json(
        {
          message: `${process.env.BACKEND_URL}/characterXspell/delete?characterId=${character_id}&spellId=${spell_id}`,
        },
        { status: 200 }
      );
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
