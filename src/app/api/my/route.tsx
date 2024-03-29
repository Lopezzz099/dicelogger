import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const revalidate = 0

export async function GET(req: Request, res: NextApiResponse) {

  try {
    const cookie = cookies().get("Session")?.value

    if (!cookie) {
      throw new Error('Token is missing');
    }
<<<<<<< HEAD
    const response = await fetch(process.env.BACKEND_URL + "/user/jwt", {
      headers: {
        'Cookie': `Session=${cookie}`
      }
=======

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/user/jwt", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": "Session=" + cookie
      },
>>>>>>> 6f90cbd94e1431dd8754b20727ead8fadfe2aa50
    });

    if (response.ok) {
      const data: User = await response.json()
<<<<<<< HEAD
      if (data.subExpiration < new Date().toISOString()) {
        data.subscribed = false
      } else {
        data.subscribed = true
      }
      return NextResponse.json(data, { status: 200 });
=======
      // console.log(data);
      
      return NextResponse.json({ data }, { status: 200 });
>>>>>>> 6f90cbd94e1431dd8754b20727ead8fadfe2aa50
    } else {
      throw new Error('Token is expired/wrong');
    }
  } catch (err: any) {
    const message = err?.message || 'Something went wrong!';
    return NextResponse.json({ message: message }, { status: 400 });
  }

}