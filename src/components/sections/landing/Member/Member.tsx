import LinkButton from "@/components/common/buttons/LinkButton";
import style from "./Member.module.css";
import CardMember from "../CardMember/CardMember";
import DwarfFace from "@/components/icons/DwarfFace";
import AllForOne from "@/components/icons/AllForOne";


const object = {
  card1: {
    icon: <DwarfFace/>,
    title: "Personajes",
    text: "Juega con los personajes únicos que tenemos para tí.",
  },
  card2: {
    icon: <AllForOne/>,
    title: "Campañas",
    text: "Disfruta de campañas épicas diseñadas por nuestros expertos.",
  },
};

const Member = () => {
  return (
    <section className={` section landing-padding`}>
      <div className={`${style.hero}` + ` content`}>
        <h2>
          <span>Hazte miembro y accede a </span>
          <span className={`${style.span}`}>contenido exclusivo</span>
        </h2>
        <div className={`${style.cardContainer}`}>
          <CardMember
            icon={object.card1.icon}
            title={object.card1.title}
            text={object.card1.text}
          />
          <CardMember
            icon={object.card2.icon}
            title={object.card2.title}
            text={object.card2.text}
          />
        </div>
        <div className={`${style.conteinerButton}`}>
          <LinkButton className={`${style.buttonGrey}`} href={"/"}>
            Soy Jugador
          </LinkButton>
          <LinkButton className={`${style.buttonRed}`} href={"/"}>
            Soy Máster
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default Member;
