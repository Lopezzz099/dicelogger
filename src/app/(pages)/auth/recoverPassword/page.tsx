import Footer from "@/components/landing/Footer/Footer";
import AuthForm from "@/components/auth/AuthForm/AuthForm";
import RecoverPasswordForm from "@/components/auth/RecoverPasswordForm/RecoverPasswordForm";
import styles from "../auth.module.css"

export default function Recover() {
    return (
        <main className={styles.main}>
            <AuthForm>
                <RecoverPasswordForm />
            </AuthForm>
            <Footer />
        </main>
    );
}
