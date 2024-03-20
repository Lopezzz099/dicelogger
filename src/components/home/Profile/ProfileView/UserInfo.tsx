import React from "react";
import styles from "./UserInfo.module.css";
import Input from "@/components/common/inputs/Input";
import Button from "@/components/common/buttons/Button";
import FormGroup from "../../NewLayout/FormGroup";

const UserInfo = () => {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.infoUsuario}>
        <h2>Información de usuario</h2>
        <div className={styles.userInputs}>
          <FormGroup>
            <label htmlFor="name" className={styles.label}>
              Nombre mostrado
            </label>
            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="name" className={styles.label}>
              Usuario
            </label>
            <Input
              type="text"
              name="name"
              placeholder="johndoe17"
              required
              className={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="name" className={styles.label}>
              Correo electrónico
            </label>
            <Input
              type="text"
              name="name"
              placeholder="johndoe@gmail.com"
              required
              className={styles.input}
            />
          </FormGroup>
        </div>
        <Button>Guardar cambios</Button>
      </div>
    </div>
  );
};

export default UserInfo;
