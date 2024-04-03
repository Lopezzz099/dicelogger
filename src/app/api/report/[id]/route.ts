import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { id: string } }){
  if (!params.id) {
    return NextResponse.json({
      message: 'Invalid request body',
    }, { status: 400 })
  }

  return NextResponse.json({ url: process.env.BACKEND_URL + "/report/character/campaign/" + params.id }, { status: 200 })
}