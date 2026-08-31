"use client";

import React, { useState } from "react";
import styles from "./Security.module.css";
import InputPassword from "@/components/common/inputs/InputPassword";
import Button from "@/components/common/buttons/Button";
import FormGroup from "../../NewLayout/FormGroup";

const Security = ({ updateUser }: any) => {
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password === formData.repeatPassword) {
      const newFormData = {
        password: formData.password,
      };
      ("use server");
      updateUser(newFormData);
    } else {
      setError("La contraseña no coincide");
    }
  };

  return (
    <div className={styles.security}>
      <div className={styles.securityInfo}>
        <h2>
          ¿Quieres cambiar tu contraseña? <br />{" "}
          <span>Introduce una nueva</span>
        </h2>
        <form onSubmit={onSubmit} className={styles.passwordFields}>
          <FormGroup>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <InputPassword
              name="password"
              placeholder="••••••••••"
              required
              className={styles.input}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="repeatPassword" className={styles.label}>
              Repetir contraseña
            </label>
            <InputPassword
              name="repeatPassword"
              placeholder="••••••••••"
              required
              className={styles.input}
              onChange={handleChange}
            />
          </FormGroup>
          {error !== "" && <p className={styles.error}>{error}</p>}
          <Button type="submit" className={styles.submit}>
            Guardar cambios
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Security;
