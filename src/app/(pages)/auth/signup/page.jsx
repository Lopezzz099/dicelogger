import Footer from "@/components/sections/landing/Footer/Footer";
import AuthForm from "@/components/sections/auth/AuthForm/AuthForm";
import styles from "../auth.module.css"
import SignUpForm from "@/components/sections/auth/SignUpForm/SignUpForm";

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