import React from "react";
import styles from "./Security.module.css";
import InputPassword from "@/components/common/inputs/InputPassword";
import Button from "@/components/common/buttons/Button";
import FormGroup from "../../NewLayout/FormGroup";

const Security = () => {
  return (
    <div className={styles.security}>
      <div className={styles.securityInfo}>
        <h2>
          ¿Quieres cambiar tu contraseña? <br />{" "}
          <span>Introduce una nueva</span>
        </h2>
        <div className={styles.passwordFields}>
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
          <FormGroup>
            <label htmlFor="repeatPassword" className={styles.label}>
              Repetir contraseña
            </label>
            <InputPassword
              name="repeatPassword"
              placeholder="••••••••••"
              required
              className={styles.input}
            />
          </FormGroup>
        </div>

        <Button type="submit" className={styles.submit}>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default Security;
