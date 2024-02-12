import Logo from "@/components/icons/Logo";
import style from "./AuthForm.module.css";
import Link from "next/link";

export type AuthFormProps = {
  children?: React.ReactNode;
};

const AuthForm = (props: AuthFormProps) => {
  return (
    <section className={style.paddingAuth + " section"}>
      <div className={style.sectionAuth}>
        <Link href={"/"}>
          <Logo size={"4rem"} />
        </Link>
        {props.children}
      </div>
    </section>
  );
};

export default AuthForm;
