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
    const response = await fetch(process.env.BACKEND_URL + "/character", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const characters = await response.json();
      console.log(characters);
      return NextResponse.json(characters, { status: 200 });
    } else {
      throw new Error("request failed")
    }
  } catch (err) {
    console.log(1 + " " + err);
    return NextResponse.json({ message: "500" }, { status: 500 })
  }


}