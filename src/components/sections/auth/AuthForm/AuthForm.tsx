import Logo from "@/components/icons/Logo";
import style from "./AuthForm.module.css";

export type AuthFormProps = {
  children?: React.ReactNode;
};

const AuthForm = (props: AuthFormProps) => {
  return (
    <section className={style.paddingAuth + " section"}>
      <div className={style.sectionAuth}>
        <Logo size={"4rem"} />
        {props.children}
      </div>
    </section>
  );
};

export default AuthForm;
