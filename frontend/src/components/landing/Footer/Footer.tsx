import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={` section`}>
      <div className={`${styles.footer}` + ` content`}>
        <hr />
        <div className={`${styles.textContainer}`}>
          <p>Proyecto integrador 2024 - Digital House</p>
          <Link href={'https://github.com/proyecto-dnd'} target="_blank">Ver código fuente</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;