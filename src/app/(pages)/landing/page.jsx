import styles from "./page.module.css";
import LinkButton from '../../../components/common/buttons/LinkButton';
import Member from "@/components/sections/landing/Member/Member";

export default function Landing() {
  return (
    <main>
        <section className={` section`}>
            <div className={styles.hero + ' content'}>
                <h2>
                    Gestiona tus campañas de Dungeons & Dragons
                </h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text.
                </p>
                <LinkButton href={'/'}>
                    ¡Comienza tu aventura!
                </LinkButton>
            </div>
        </section>
        <Member/>
    </main>
  );
}
