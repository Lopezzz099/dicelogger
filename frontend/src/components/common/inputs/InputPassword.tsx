"use client";

import Eye from "@/components/icons/ui/Eye";
import Input from "./Input";
import { InputProps } from "./Input";
import EyeOn from "@/components/icons/ui/EyeOn";
import styles from "./Input.module.css";
import { useState } from "react";

const InputPassword = (props: InputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Input
      type={show ? "text" : "password"}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      disabled={props.disabled}
      className={props.className}
    >
      <button
        className={styles.passwordButton}
        type="button"
        onClick={handleClick}
      >
        {show ? <EyeOn size={"1.5rem"} /> : <Eye size={"1.5rem"} />}
      </button>
    </Input>
  );
};

export default InputPassword;
