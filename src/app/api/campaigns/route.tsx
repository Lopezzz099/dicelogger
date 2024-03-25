import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  // TODO: authentication get campaigns that belong to the user

  // TO DELETE
  const campaigns = [
    {
      img: "/assets/home/campaigns/Rectangle_10.png",
      title: "Golinjam",
      text: "En tierras lejanas, un grupo de aventureros se enfrenta a un mal ancestral. ¿Podrán sobrevivir?",
    },
    {
      img: "/assets/home/campaigns/Rectangle_9.png",
      title: "Leyenda de Babulus",
      text: "Había una vez un reino en el que la magia era la ley. Las leyendas cuentan que un día, un grupo de aventureros se enfrentó a un mal ancestral. ¿Podrán sobrevivir?",
    },
  ];

  return NextResponse.json(campaigns, { status: 200 });
}
