"use client";
import Button from "@/components/common/buttons/Button";
import Input from "@/components/common/inputs/Input";
import InputPassword from "@/components/common/inputs/InputPassword";
import styles from "./SignUpForm.module.css";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";

const SignUpForm = () => {

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
      <h1 className={styles.h1}>Crear cuenta</h1>
      <p className={styles.text}>
        ¡Bienvenido! Ingresa tus datos para formar parte de{" "}
        <span className={styles.span}>DiceLogger</span>
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.container}>
          <div className={styles.box}>
            <label htmlFor="name" className={styles.label}>
              Nombre
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Doe"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="lastName" className={styles.label}>
              Apellido
            </label>
            <Input
              type="text"
              name="lastName"
              placeholder="Jhon"
              required
              className={styles.input}
            />
          </div>
        </div>
        <label htmlFor="user" className={styles.label}>
          Username
        </label>
        <Input
          type="text"
          name="user"
          placeholder="johndoe17"
          required
          className={styles.input}
        />
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <Input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
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
        <label htmlFor="repitPassword" className={styles.label}>
          Repetir contraseña
        </label>
        <InputPassword
          name="repitPassword"
          placeholder="••••••••••"
          required
          className={styles.input}
        />
        <div className={styles.log}>
          <Button type="submit" className={styles.submit}>
            Crear cuenta
          </Button>
          <span style={{ marginTop: "20px" }}>
          ¿Ya tienes cuenta? <Link href={"/auth/login"}>Inicia Sesión</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
