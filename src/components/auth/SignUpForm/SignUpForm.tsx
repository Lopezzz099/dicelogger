"use client";
import Button from "@/components/common/buttons/Button";
import Input from "@/components/common/inputs/Input";
import InputPassword from "@/components/common/inputs/InputPassword";
import styles from "./SignUpForm.module.css";
import formStyles from "../AuthForm/AuthForm.module.css";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";
import FormGroup from "@/components/home/NewLayout/FormGroup";

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
      <h1>Crear cuenta</h1>
      <p className={formStyles.description}>
        ¡Bienvenido! <br/>
        Ingresa tus datos para formar parte de <strong>DiceLogger</strong>
      </p>
      <form onSubmit={handleSubmit} className={formStyles.form}>
        <section className={styles.container}>
          <FormGroup>
            <label htmlFor="user" className={styles.label}>
              Nombre de usuario
            </label>
            <Input
              type="text"
              name="user"
              placeholder="johndoe17"
              required
              className={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="displayName" className={styles.label}>
              Nombre de display
            </label>
            <Input
              type="text"
              name="displayName"
              placeholder="Jhon"
              required
              className={styles.input}
            />
          </FormGroup>
        </section>
        <FormGroup>
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
        </FormGroup>
        {/* <FormGroup>
          <label htmlFor="repitPassword" className={styles.label}>
            Repetir contraseña
          </label>
          <InputPassword
            name="repitPassword"
            placeholder="••••••••••"
            required
            className={styles.input}
          />
        </FormGroup> */}
        <div className={formStyles.buttons}>
          <Button type="submit" className={styles.submit}>
            Crear cuenta
          </Button>
          <span className={formStyles.navigation}>
            ¿Ya tienes cuenta? <Link href={"/auth/login"}>Inicia Sesión</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
