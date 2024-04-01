import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const id = req.url ? req.url.split("/").pop() : undefined;
    // console.log(id)

    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/spell/class/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const spells = await response.json();

      return NextResponse.json(spells, { status: 200 });
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
