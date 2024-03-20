import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function GET(req: Request, res: NextApiResponse) {
  const response = await fetch(process.env.BACKEND_URL + "/user/jwt", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    console.log(response)
    return NextResponse.json({ message: 'Retrieved' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
}