import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export async function GET(req: Request, res: NextApiResponse) {
//   // TODO: authentication get characters that belong to the user

//   // TO DELETE
//   const characters = [
//     {
//       img: "/assets/home/characters/astarion.webp",
//       name: "Astarion",
//       level: 8,
//       color: "#2c2639",
//       icon: "/assets/home/characters/shield-svgrepo-com1.png",
//       characterClass: "Guerrero",
//       race: "Alto elfo",
//     },
//     {
//       img: "/assets/home/characters/shadowheart.webp",
//       name: "Shadowheart",
//       level: 12,
//       color: "#7a1010",
//       icon: "/assets/home/characters/Vector(1).png",
//       characterClass: "Guerrero",
//       race: "Alto elfo",
//     },
//     {
//       img: "/assets/home/characters/karlach.webp",
//       name: "Karlach",
//       level: 9,
//       color: "#700a55",
//       icon: "/assets/home/characters/Vector.png",
//       characterClass: "Guerrero",
//       race: "Alto elfo",
//     },
//     {
//       img: "/assets/home/characters/gale.webp",
//       name: "Gale",
//       level: 14,
//       color: "#1d1a77",
//       icon: "/assets/home/characters/shield-svgrepo-com1.png",
//       characterClass: "Guerrero",
//       race: "Alto elfo",
//     },
//     {
//       img: "/assets/home/characters/halsin.webp",
//       name: "Halsin",
//       level: 3,
//       color: "#426715",
//       icon: "/assets/home/characters/Vector(1).png",
//       characterClass: "Guerrero",
//       race: "Alto elfo",
//     },
//   ];

//   return NextResponse.json(characters, { status: 200 });
// }

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/character`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const characters = await response.json();
      return NextResponse.json(characters, { status: 200 });
    } else {
      throw new Error('Token is missing or request failed');
    }
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  // Lógica para manejar la solicitud POST
}

export async function PUT(req: Request, res: NextApiResponse) {
  // Lógica para manejar la solicitud PUT
}

export async function DEL(req: Request, res: NextApiResponse) {
  // Lógica para manejar la solicitud DELETE
}

// export async function POST(req: Request, res: NextApiResponse) {
//   try {
//     const response = await fetch(process.env.BACKEND_URL + "/user/jwt", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
//     if (response.ok) {
//       return NextResponse.json({ message: 'Retrieved' }, { status: 200 });
//     } else {
//       throw new Error('Token is missing');
//     }
//   } catch (err) {
//     return NextResponse.json({ message: 'Bad request' }, { status: 400 });
//   }

// }