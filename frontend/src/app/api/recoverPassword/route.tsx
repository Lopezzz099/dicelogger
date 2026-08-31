import { auth } from "@/services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();
    const { email } = body;


    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }


    try {
        await sendPasswordResetEmail(auth, email);


        return NextResponse.json({ message: 'Password reset email sent successfully' }, { status: 200 });
    } catch (err: any) {
        const errorMessage = err.message || 'An error occurred while sending the password reset email';
        console.error(errorMessage);


        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}

