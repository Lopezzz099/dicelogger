import Link from "next/link";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={` section`}>
      <div className={`${style.hero}` + ` content`}>
        <hr className={`${style.line}`}></hr>
        <div className={`${style.textContainer}`}>
          <p>Proyecto integrador 2024 - Digital House</p>
          <Link href={'https://github.com/proyecto-dnd'} target="_blank">Ver código fuente</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;