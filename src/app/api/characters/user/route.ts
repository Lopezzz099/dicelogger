import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  const cookie = cookies().get("Session")?.value
  if (!cookie) {
    return NextResponse.json(
      { message: "Cookie is missing" },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/character/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `Session=${cookie}`,
      },
    });

    if (response.ok) {
      const characters = await response.json();
      // console.log(characters)
      return NextResponse.json(characters, { status: 200 });
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