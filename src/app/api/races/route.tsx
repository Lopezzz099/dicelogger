import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/race`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const races = await response.json();
      console.log(races)
      return NextResponse.json(races, { status: 200 });
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