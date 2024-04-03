import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
   const id = req.url ? req.url.split('/').pop() : undefined;

  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 });
  }
  try {
    const cookie = cookies().get("Session")?.value

    const response = await fetch(`${process.env.BACKEND_URL}/friendship/${id}`, {
      method: 'POST',
      headers: {
        'Cookie': `Session=${cookie}`
      }
    });
  
    if (!response.ok) {
      return NextResponse.json({ message: 'Error following user' }, { status: 400 });
    }
  
    return NextResponse.json({ message: 'User followed' }, { status: 200 });
  } catch (err: any) {
    const message = err?.message || 'Something went wrong!';
    return NextResponse.json({ message: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  const id = req.url ? req.url.split('/').pop() : undefined;

  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 });
  }
  try {
    const cookie = cookies().get("Session")?.value

    const response = await fetch(`${process.env.BACKEND_URL}/friendship/${id}`, {
      method: 'DELETE',
      headers: {
        'Cookie': `Session=${cookie}`
      }
    });
  
    if (!response.ok) {
      return NextResponse.json({ message: 'Error unfollowing user' }, { status: 400 });
    }
  
    return NextResponse.json({ message: 'User unfollowed' }, { status: 200 });
  } catch (err: any) {
    const message = err?.message || 'Something went wrong!';
    return NextResponse.json({ message: message }, { status: 400 });
  }
}