import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const hardCodedFriends: Friend[] = [
  {
    id: "1",
    displayname: 'Juancho',
    username: 'juancho123',
    avatar: "https://randomuser.me/api/portraits/thumb/men/6.jpg",
    friend: true,
  },
  {
    id: "2",
    displayname: 'Maria Perez',
    username: 'maria123',
    avatar: "https://randomuser.me/api/portraits/thumb/women/6.jpg",
    friend: true,
  },
  {
    id: "3",
    displayname: 'Pedrito11',
    username: 'pedrito11',
    avatar: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
    friend: true,
  },
]

const hardCodedFriendsSearch: Friend[] = [
  {
    id: "4",
    displayname: 'Pepita',
    username: 'pepita123',
    avatar: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
    friend: false,
  },
  {
    id: "5",
    displayname: 'Ejemplo no-amigo',
    username: 'ejemplo123',
    avatar: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
    friend: false,
  },
]

export async function GET(req: NextRequest, res: NextApiResponse) {
  const search = req.nextUrl.searchParams.get('search');

  if (!search) {
    const cookie = cookies().get("Session")?.value

    const response = await fetch(`${process.env.BACKEND_URL}/friendship`, {
      headers: {
        'Cookie': `Session=${cookie}`
      }
    });
    const data = await response.json();
    console.log(data)
    let friends: Friend[] = data.map((friend: any) => {
      return {
        id: friend.user_id,
        displayname: friend.display_name,
        username: friend.username,
        avatar: friend.image,
        friend: friend.following && friend.follows_you,
      }
    })
    return NextResponse.json(friends, { status: 200 });
  } else {

    const response = await fetch(`${process.env.BACKEND_URL}/friendship/search/${search}`);
    const data = await response.json();
    // parse data name -> displayname, name -> username
    const friends = data.map((friend: any) => {
      return {
        id: friend.id,
        displayname: friend.name,
        username: friend.name,
        avatar: friend.name,
        friend: false,
      }
    })
    return NextResponse.json(friends, { status: 200 });
  }
}