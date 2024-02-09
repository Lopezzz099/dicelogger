import { ItemCardProps } from "@/components/common/cards/ItemCard";
import Bookmarklet from "@/components/icons/Bookmarklet";
import Cash from "@/components/icons/Cash";
import Cowled from "@/components/icons/Cowled";
import TreasureMap from "@/components/icons/TreasureMap";

const items: ItemCardProps[] = [
  {
    icon: <Cowled />,
    title: 'Personajes',
    description: 'Crea tus propios personajes o utiliza los creados por nosotros',
  },
  {
    icon: <TreasureMap />,
    title: 'Campañas',
    description: 'Crea tus propios personajes o utiliza los creados por nosotros',
  },
  {
    icon: <Bookmarklet />,
    title: 'Historia',
    description: 'Crea tus propios personajes o utiliza los creados por nosotros',
  },
  { 
    icon: <Cash />,
    title: 'Diversión',
    description: 'Disfruta de una experiencia única con tus amigos y familiares',
  },

]

export default items;