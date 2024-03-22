import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.url ? req.url.split('/').pop() : undefined;
    // console.log(id)

    if (!id) {
      return NextResponse.json({ message: 'ID is missing' }, { status: 400 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/character/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response)

    if (!response.ok) {
      throw new Error('Token is missing or request failed');
    }

    const character = await response.json();
    // console.log(character)
    return NextResponse.json(character, { status: 200 });
  } catch (err: any) {
    console.error('Error:', err);
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

