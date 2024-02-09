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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                </p>
                <LinkButton href={'/'}>
                    ¡Comienza tu aventura!
                </LinkButton>
            </div>
        </section>
    )
}

export default Hero;