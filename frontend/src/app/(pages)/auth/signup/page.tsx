import Footer from "@/components/landing/Footer/Footer";
import AuthForm from "@/components/auth/AuthForm/AuthForm";
import styles from "../auth.module.css"
import SignUpForm from "@/components/auth/SignUpForm/SignUpForm";

export default function Signup() {
  return (
    <main className={styles.main}>
      <AuthForm>
        <SignUpForm/>
      </AuthForm>
      <Footer/>
    </main>
  );
}