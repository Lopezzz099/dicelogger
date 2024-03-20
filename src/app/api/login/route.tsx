import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // "prueba@gmail.com", "pass123"
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredentials.user.getIdToken();
  
    const data = {
      idToken: token
    };
  
    const jsonData = JSON.stringify(data);
  
    let jwt = '';
    try {
      const response = await fetch(process.env.BACKEND_URL + "/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData,
      });

      // return session cookies to the client as httpOnly cookies
      if (response.ok) {
        jwt = response.headers.get('Set-Cookie')?.split(';')[0].split('=')[1] as string;
      }
    } catch (err) {
      console.error(err);
    }

    if (!jwt) {
      throw new Error('Token is missing');
    }

    return NextResponse.json({ message: 'Login successful', data: { username: email.split('@')[0], email } }, { status: 200, headers: { 'Set-Cookie': `Session=${jwt}; Path=/; HttpOnly` }});
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}



