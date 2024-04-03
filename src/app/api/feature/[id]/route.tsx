import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const id = req.url ? req.url.split("/").pop() : undefined;

    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/feature/character/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      return NextResponse.json(data, { status: 200 });
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
