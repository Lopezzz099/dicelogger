import useLogin from '@/hooks/useLogin';
import { auth } from '@/services/firebase';
import { UserCredential, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { username, displayname, email, password } = body;

  if (!email || !password || !username) {
    return NextResponse.json({ message: 'Username, email and password are required' }, { status: 400 });
  }

  const jsonData = JSON.stringify({ username, displayname, email, password });
  try {
    const response = await fetch(process.env.BACKEND_URL + "/user/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData,
    })
  } catch (err) {
    console.error(2, err);
  }
  let jwt = '';
  try {
    const loginResponse = await fetch(process.env.URL + "/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    jwt = loginResponse.headers.get('Set-Cookie')?.split(';')[0].split('=')[1] as string;
  } catch (err) {
    console.error(1, err);
  }
  if (!jwt) {
    throw new Error('Token is missing');
  }
  return NextResponse.json({ message: 'Signup successful', data: { username, email } }, { status: 200, headers: { 'Set-Cookie': `Session=${jwt}; Path=/; HttpOnly` }});
  // return NextResponse.json({ message: 'Signup successful', data: { username: email.split('@')[0], email } }, { status: 200, headers: { 'Set-Cookie': `token=${jwt}; Path=/; HttpOnly` } });
}



