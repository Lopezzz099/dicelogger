import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <h2>
          Gestiona tus campañas de Dungeons & Dragons
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
        </p>
        <button>
          ¡Comienza tu aventura!
        </button>
      </section>
    </main>
  );
}
