import styles from "./Hero.module.css";
import LinkButton from '@/components/common/buttons/LinkButton';
import Navbar from "@/components/sections/landing/Navbar/Navbar";

const Hero = () => {
  return (
    <section className={styles.wrapper + ' section'}>
      <Navbar />
      <div className={styles.hero + ' content'}>
        <h2>
          Gestiona tus campañas de <br />Dungeons & Dragons
        </h2>
        <p>
          Bienvenido a la mejor herramienta para gestionar tus campañas de Dungeons & Dragons. Crea tus personajes, tus aventuras y tus monstruos. ¡Todo en un solo lugar!
        </p>
        <LinkButton className={styles.animatedButton} href={'/auth/signup'}>
          ¡Comienza tu aventura!
        </LinkButton>
      </div>
    </section>
  )
}

export default Hero;