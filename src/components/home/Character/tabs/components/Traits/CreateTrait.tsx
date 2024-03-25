"use client";

import React, { FormEvent, useState } from "react";
import styles from "./CreateTrait.module.css";
import formStyles from "@/components/home/NewLayout/Extra.module.css";

import FormGroup from "@/components/home/NewLayout/FormGroup";
import Input from "@/components/common/inputs/Input";

import Button from "@/components/common/buttons/Button";
import TextArea from "@/components/common/inputs/TextArea";

const CreateTrait = () => {
  const [traitName, setTraitName] = useState("");

  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trait = {
      name: traitName,
      Descripción: description,
    };
  };

  return (
    <div className={styles.createTrait}>
      <form className={styles.traitForm} onSubmit={handleSubmit}>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="name">
            Nombre
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Escribe aquí..."
            value={traitName}
            onChange={(e) => setTraitName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="description">
            Descripción
          </label>
          <TextArea
            disableResize
            className={formStyles.textarea}
            name="description"
            placeholder="Escribe aquí..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>
        <div className={styles.traitButtonContainer}>
          <Button className={styles.traitButton} type="submit">
            Crear conjuro
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrait;
