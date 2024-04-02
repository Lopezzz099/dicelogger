import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  const session = cookies().get("Session")?.value;

  if (!session) {
    console.log(1);
    throw new Error("Token is missing");
  }

  try {
    const res = await fetch(process.env.BACKEND_URL + "/user/checkSub", {
      headers: {
        Cookie: `Session=${session}`,
      },
    });
    if (res.ok) {
      return NextResponse.json(
        { message: "User is subscribed." },
        { status: 200 }
      );
    } else {
      throw new Error("User is not subscribed");
    }
  } catch (err: any) {
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 403 });
  }
}
