"use client";
import Button from "@/components/common/buttons/Button";
import Input from "@/components/common/inputs/Input";
import InputPassword from "@/components/common/inputs/InputPassword";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";

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
      <h1 className={styles.h1}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <Input
          type="text"
          name="email"
          placeholder="johndoe17"
          required
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <InputPassword
          name="password"
          placeholder="••••••••••"
          required
          className={styles.input}
        />
        <div className={styles.log}>
          <Button type="submit" className={styles.submit}>
            Iniciar sesión
          </Button>
          <span style={{ marginTop: "20px" }}>
            ¿Eres nuevo? <Link href={"/auth/signup"}>Regístrate</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
