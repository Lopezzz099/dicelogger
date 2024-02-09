import styles from "./page.module.css";
import LinkButton from '../../../components/common/buttons/LinkButton';

export default function Landing() {
  return (
    <main>
      <section className={styles.hero}>
        <h2>
          Gestiona tus campañas de Dungeons & Dragons
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
        </p>
        <LinkButton href={'/'}>
          ¡Comienza tu aventura!
        </LinkButton>
      </section>
    </main>
  );
}
