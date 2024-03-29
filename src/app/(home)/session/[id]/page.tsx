import NewLayoutHeader from "@/components/home/NewLayout/NewLayoutHeader";
import Chat from "./Chat";
import styles from "./page.module.css";

const SessionPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <NewLayoutHeader title={"Golinjam"} slug={[{ label: "Campañas", href: "/campaigns" }, { label: "Sesión 1" }]} />
        <Chat />
      </div>
    </section>
  );
};

export default SessionPage;