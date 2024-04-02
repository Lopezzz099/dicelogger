import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const search = req.nextUrl.searchParams.get('search');
  const cookie = cookies().get("Session")?.value

  if (!search) {

    const response = await fetch(`${process.env.BACKEND_URL}/friendship`, {
      headers: {
        'Cookie': `Session=${cookie}`
      }
    });
    const data = await response.json();

    let friends: Friend[] = [];
    if (Object.keys(data).length > 0) {
      friends = data.map((friend: any) => {
        return {
          id: friend.user_id,
          displayname: friend.display_name,
          username: friend.username,
          avatar: friend.image,
          following: friend.following,
          followsYou: friend.follows_you,
        }
      })
    }
    return NextResponse.json(friends, { status: 200 });
  } else {

    const response = await fetch(`${process.env.BACKEND_URL}/friendship/search/${search}`,
    {
      headers: {
        'Cookie': `Session=${cookie}`
      }
    });
    const data = await response.json();
    // parse data name -> displayname, name -> username
    const friends = data.map((friend: any) => {
      return {
        id: friend.user_id,
        displayname: friend.display_name,
        username: friend.username,
        avatar: friend.image,
        following: friend.following,
        followsYou: friend.follows_you,
      }
    })
    return NextResponse.json(friends, { status: 200 });
  }
}