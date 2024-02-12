"use client";
import Button from "@/components/common/buttons/Button";
import Input from "@/components/common/inputs/Input";
import InputPassword from "@/components/common/inputs/InputPassword";
import { useRouter } from "next/navigation";
import style from "./LoginForm.module.css";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Fetch
    // Hardcoded localstorage for testing
    const user = (e.target as HTMLFormElement).user.value;
    window.localStorage.setItem("user", user);
    router.push("/");
  };

  return (
    <>
      <h1 className={style.h1}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="user" className={style.label}>
          Username o correo electrónico
        </label>
        <Input
          type="text"
          name="user"
          placeholder="johndoe17"
          required
          className={style.input}
        />
        <label htmlFor="password" className={style.label}>
          Contraseña
        </label>
        <InputPassword
          name="password"
          placeholder="••••••••••"
          required
          className={style.input}
        />
        <div className={style.log}>
          <Button type="submit" className={style.submit}>
            Iniciar sesión
          </Button>
          <span style={{ marginTop: "20px" }}>
            ¿Eres nuevo? <Link href={"/auth/register"}>Regístrate</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
