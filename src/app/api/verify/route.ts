import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const cookie = cookies().get("Session")?.value;
    console.log(cookie)
    if (!cookie) {
      throw new Error("Token is missing");
    }
    const response = await fetch(process.env.BACKEND_URL + "/user/sendEmailVerification", {
      method: 'POST',
      headers: {
        Cookie: `Session=${cookie}`,
      },
    });

    console.log(response)

    if (response.ok) {
      return NextResponse.json("Email sent", { status: 200 });
    } else {
      throw new Error("Token is expired/wrong");
    }
  } catch (err: any) {
    const message = err?.message || "Something went wrong!";
    console.log(err);
    return NextResponse.json({ message }, { status: 500 });
  }
}
