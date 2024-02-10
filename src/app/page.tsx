import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation";


export default function Home() {

  if (true) {
    redirect('/landing');
  }

  return (
    <main>
      <h2>Este es el home</h2>
      <p>Donde van a estar las campañas y todo eso</p>
    </main>
  );
}
