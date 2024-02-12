import Footer from "@/components/sections/landing/Footer/Footer";
import AuthForm from "@/components/sections/auth/AuthForm/AuthForm";
import styles from "../auth.module.css"

export default function Signup() {
  return (
    <main className={styles.main}>
      <AuthForm>
        <p>a</p>
      </AuthForm>
      <Footer/>
    </main>
  );
}