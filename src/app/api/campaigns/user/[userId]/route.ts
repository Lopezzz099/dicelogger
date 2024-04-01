import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      throw new Error("userId is missing");
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/campaign/user/${params.userId}`
    );

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("Request failed with status " + res.status);
    }
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
