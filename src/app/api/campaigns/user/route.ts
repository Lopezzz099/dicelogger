import { NextApiResponse } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {  
  const session = cookies().get("Session")?.value

  if (!session) {
    console.log(1);
    throw new Error("Token is missing");
  }

  console.log(session);
  

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/campaign/user`, {
      headers: {
        Cookie: `Session=${session}`,
      }
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(err);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
