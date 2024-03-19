import React from "react";
import styles from "./Security.module.css";
import InputPassword from "@/components/common/inputs/InputPassword";
import Button from "@/components/common/buttons/Button";

const Security = () => {
  return (
    <div className={styles.security}>
      <div className={styles.securityInfo}>
        <h2>
          ¿Quieres cambiar tu contraseña? <br />{" "}
          <span>Introduce una nueva</span>
        </h2>
        <div className={styles.passwordFields}>
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
        </div>

        <Button type="submit" className={styles.submit}>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default Security;
