import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const cookie = cookies().get("Session")?.value;
    // console.log(cookie);

    if (!cookie) {
      throw new Error("Token is missing");
    }
    const response = await fetch(process.env.BACKEND_URL + "/user/jwt", {
      headers: {
        Cookie: `Session=${cookie}`,
      },
    });

    if (response.ok) {
      const data: User = await response.json();
      if (data.subExpiration < new Date().toISOString()) {
        data.subscribed = false;
      } else {
        data.subscribed = true;
      }
      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Token is expired/wrong");
    }
  } catch (err: any) {
    const message = err?.message || "Something went wrong!";
    console.log(err);
    return NextResponse.json({ message }, { status: 500 });
  }
}
