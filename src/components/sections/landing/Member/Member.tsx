import LinkButton from "@/components/common/buttons/LinkButton";
import styles from "./Member.module.css";
import CardMember from "../CardMember/CardMember";
import items from "./items";

const Member = () => {
  return (
    <section className={` section landing-padding`}>
      <div className={`${styles.member}` + ` content`}>
        <h2>
          <span>Hazte miembro y accede a </span>
          <span className={`${styles.span}`}>contenido exclusivo</span>
        </h2>
        <div className={`${styles.cardContainer}`}>
          { items.map((object, index) => (
            <CardMember
              key={index}
              icon={object.icon}
              title={object.title}
              text={object.text}
            />
          ))}
        </div>
        <div className={`${styles.conteinerButton}`}>
          <LinkButton className={`${styles.buttonRed}`} href={"/"}>
            Soy Máster
          </LinkButton>
          <LinkButton className={`${styles.buttonGrey}`} href={"/"}>
            Soy Jugador
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default Member;
