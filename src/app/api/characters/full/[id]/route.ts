import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { id: string } }) {
  if (!params.id) {
    return new Response("No id provided", { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/character/${params.id}`);
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(
        data, { status: 200 }
      )
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}