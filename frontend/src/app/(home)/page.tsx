import Link from 'next/link';
import styles from './Home.module.css';
import Right from '@/components/icons/ui/Right';

export default function Home() {
  return (
    <section className={styles.home}>
      <h2>¡Bienvenido a <strong>Dicelogger</strong>!</h2>
      <p className={styles.subtitle}>¿No sabes que hacer? ¡Aquí tienes algunas recomendaciones!</p>
      <section className={styles.buttons}>
        <Link href="/characters/new">
          <p>Crea un personaje</p>
          <Right />
        </Link>
        <Link href="/campaigns/new">
          <p>Crea una campaña</p>
          <Right />
        </Link>
        <Link href="/friends">
          <p>Añade a tus amigos</p>
          <Right />
        </Link>
        <Link href="/manuals">
          <p>Aprende a jugar con los manuales</p>
          <Right />
        </Link>
        <Link href="/suscription">
          <p>Conoce nuestro sistema de suscripción</p>
          <Right />
        </Link>
        <Link href="/profile">
          <p>Cambia tu foto de perfil</p>
          <Right />
        </Link>
      </section>
    </section>
  );
}