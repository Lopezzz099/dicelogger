import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookie = cookies().get("Session")?.value;
    console.log(cookie);

    if (!cookie) {
      throw new Error("Token is missing");
    }

    const response = await fetch(process.env.BACKEND_URL + "/user/jwt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Session: cookie,
      },
    });

    if (response.ok) {
      const data: User = await response.json();

      return NextResponse.json({ data }, { status: 200 });
    } else {
      throw new Error("Token is missing");
    }
  } catch (err) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}
