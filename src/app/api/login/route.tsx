import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function POST(req: Request, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Only POST requests are allowed' }, { status: 405 });
  }

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, "prueba@gmail.com", "pass123");
    const token = await userCredentials.user.getIdToken();
  
    const data = {
      idToken: token
    };
  
    const jsonData = JSON.stringify(data);
  
    // api login endpoint
    // TODO: once the backend is ready, replace the url with the actual endpoint
    // TODO: the fetch should get all the user data
    const response = await fetch(process.env.BACKEND_URL + "/api/v1/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData,
    });
  
    console.log(await response.body);
  
    return NextResponse.json({ message: 'Login successful', data: { username: email.split('@')[0], email } }, { status: 200 });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}



