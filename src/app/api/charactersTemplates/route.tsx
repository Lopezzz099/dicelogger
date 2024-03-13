import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  // TODO: authentication get characters that belong to the user

  // TO DELETE
  const charactersTemplates = [
    {
      img: "/assets/home/characters/AdobeStock_569271051.png",
      name: "Evelyn Ironfist",
      pro: true,
      icon: "/assets/home/characters/shield-svgrepo-com1.png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_569271077.png",
      name: "Nombre",
      pro: true,
      icon: "/assets/home/characters/Vector(1).png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_5692824061.png",
      name: "Nombre",
      pro: false,
      icon: "/assets/home/characters/Vector.png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_569282598.png",
      name: "Nombre",
      pro: false,
      icon: "/assets/home/characters/shield-svgrepo-com1.png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_569271051.png",
      name: "Nombre",
      pro: false,
      icon: "/assets/home/characters/Vector(1).png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_569271077.png",
      name: "Nombre",
      pro: false,
      icon: "/assets/home/characters/Vector.png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_569271051.png",
      name: "Nombre",
      pro: false,
      icon: "/assets/home/characters/Vector(1).png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
    {
      img: "/assets/home/characters/AdobeStock_569271077.png",
      name: "Nombre",
      pro: false,
      icon: "/assets/home/characters/Vector.png",
      characterClass: "Guerrero",
      race: "Alto elfo",
    },
  ];

  return NextResponse.json(charactersTemplates, { status: 200 });
}
