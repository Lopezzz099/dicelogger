"use client";
import { useState } from "react";
import Button from "@/components/common/buttons/Button";
import Input from "@/components/common/inputs/Input";
import styles from "./RecoverPasswordForm.module.css";
import formStyles from "../AuthForm/AuthForm.module.css";
import Link from "next/link";
import { useRecover }  from "@/hooks/useRecover";
import FormGroup from "@/components/home/NewLayout/FormGroup";

const RecoverPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const recover = useRecover();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        try {
            await recover({email});
            setMessage("Se ha enviado un correo electrónico para restablecer tu contraseña");
        } catch (error: any) {
            setMessage("Ha ocurrido un error al enviar el correo electrónico");
        }
    };

    return (
        <>
            <h1>¿Olvidaste tu contraseña?</h1>
            <p className={formStyles.description}>
                Te ayudaremos a entrar a tu cuenta de <strong>DiceLogger</strong>
            </p>
            <form onSubmit={handleSubmit} className={formStyles.form}>
                <FormGroup>
                    <label htmlFor="email" className={styles.label}>
                        Correo electrónico
                    </label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="johndoe17@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </FormGroup>
                <div className={formStyles.buttons}>
                {message && <p className={styles.message}>{message}</p>}
                    <Button type="submit" className={styles.submit}>
                        Reestablecer contraseña
                    </Button>
                    <span className={formStyles.navigation}>
                        <Link href={"/auth/login"}>Volver al inicio de sesión</Link>
                    </span>
                </div>
            </form>
        </>
    );
};




export default RecoverPasswordForm;
