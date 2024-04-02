import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const character_id = req.url ? req.url.split("/").pop() : undefined;
    const feature_id = req.url
      ? req.url.split("/").slice(-2, -1)[0]
      : undefined;

    const res = await fetch(
      `${process.env.BACKEND_URL}/character_feature?idFeature=${feature_id}&idCharacter=${character_id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      return NextResponse.json(
        {
          message: `Feature deleted succesfully`,
        },
        { status: 200 }
      );
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log();

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
