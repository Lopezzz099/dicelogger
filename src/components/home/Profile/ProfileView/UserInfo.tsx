"use client";

import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.css";
import Input from "@/components/common/inputs/Input";
import Button from "@/components/common/buttons/Button";
import FormGroup from "../../NewLayout/FormGroup";

const UserInfo = ({
  user,
  updateUser,
}: {
  user: User;
  updateUser: (user: any) => void;
}) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    username: user.username,
    email: user.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = {
      email: formData.email,
      displayName: formData.displayName,
      name: user.username,
    };
    ("use server");
    updateUser(newFormData);
  };

  return (
    <div className={styles.userInfoContainer}>
      <form onSubmit={onSubmit} className={styles.infoUsuario}>
        <h2>Información de usuario</h2>
        <div className={styles.userInputs}>
          <FormGroup>
            <label htmlFor="displayName" className={styles.label}>
              Nombre mostrado
            </label>
            <Input
              type="text"
              name="displayName"
              placeholder="John Doe"
              required
              className={styles.input}
              value={formData.displayName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="username" className={styles.label}>
              Usuario
            </label>
            <Input
              type="text"
              name="username"
              placeholder="johndoe17"
              required
              className={styles.input}
              value={formData.username}
              onChange={handleChange}
            />
          </FormGroup>
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
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <Button type="submit">Guardar cambios</Button>
      </form>
    </div>
  );
};

export default UserInfo;
