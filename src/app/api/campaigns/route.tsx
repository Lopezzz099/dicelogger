import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function GET(req: Request, res: NextApiResponse) {
  // TODO: authentication get campaigns that belong to the user

  // TO DELETE
  const campaigns = [
    {
      img: "/assets/home/campaigns/Rectangle_10.png",
      title: "Golinjam",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...",
    },
    {
      img: "/assets/home/campaigns/Rectangle_9.png",
      title: "Leyenda de Babulus",
      text: "Disfruta de campañas épicas diseñadas por nuestros expertos.",
    },
    {
      img: "/assets/home/campaigns/Rectangle_8.png",
      title: "Dark magic secret",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...",
    },
    {
      img: "/assets/home/campaigns/Rectangle_9.png",
      title: "Leyenda de Babulus parte 2",
      text: "Disfruta de campañas épicas diseñadas por nuestros expertos.",
    },
    {
      img: "/assets/home/campaigns/Rectangle_10.png",
      title: "Golinjam parte 2",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex nisi...",
    },
    {
      img: "/assets/home/campaigns/Rectangle_8.png",
      title: "Dark magic secret parte 2",
      text: "Disfruta de campañas épicas diseñadas por nuestros expertos.",
    },
  ];
  
  return NextResponse.json(campaigns, { status: 200 });
}