import Footer from "@/components/landing/Footer/Footer";
import AuthForm from "@/components/auth/AuthForm/AuthForm";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import styles from "../auth.module.css"

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