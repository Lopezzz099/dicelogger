import Footer from "@/components/sections/landing/Footer/Footer";
import AuthForm from "@/components/sections/auth/AuthForm/AuthForm";
import LoginForm from "@/components/sections/auth/LoginForm/LoginForm";
import styles from "./page.module.css"

export default function Login() {
  return (
    <main className={styles.main}>
      <AuthForm>
        <LoginForm/>
      </AuthForm>
      <Footer/>
    </main>
  );
}