"use client";
import Button from "@/components/common/buttons/Button";
import Input from "@/components/common/inputs/Input";
import InputPassword from "@/components/common/inputs/InputPassword";
import styles from "./LoginForm.module.css";
import formStyles from "../AuthForm/AuthForm.module.css";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";
import FormGroup from "@/components/home/NewLayout/FormGroup";

const LoginForm = () => {

  const login = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Fetch
    // Hardcoded localstorage for testing
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    login({ email, password });
  };

  return (
    <>
      <h1>Iniciar sesión</h1>
      <p className={formStyles.description}>
        Escribe tus datos para ingresar a <strong>DiceLogger</strong>
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
            className={styles.input}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <InputPassword
            name="password"
            placeholder="••••••••••"
            required
            className={styles.input}
          />
          <Link href={'/auth/recoverPassword'} className={styles.forgot}>¿Olvidaste tu contraseña?</Link>
        </FormGroup>
        <div className={formStyles.buttons}>
          <Button type="submit" className={styles.submit}>
            Iniciar sesión
          </Button>
          <span className={formStyles.navigation}>
            ¿Eres nuevo? <Link href={"/auth/signup"}>Regístrate</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
