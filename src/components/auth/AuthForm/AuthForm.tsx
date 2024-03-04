import Logo from "@/components/icons/Logo";
import styles from "./AuthForm.module.css";
import Link from "next/link";

export type AuthFormProps = {
  children?: React.ReactNode;
};

const AuthForm = (props: AuthFormProps) => {
  return (
    <section className={styles.paddingAuth + " section"}>
      <div className={styles.sectionAuth}>
        <Link href={"/"}>
          <Logo size={"4rem"} />
        </Link>
        {props.children}
      </div>
    </section>
  );
};

export default AuthForm;
