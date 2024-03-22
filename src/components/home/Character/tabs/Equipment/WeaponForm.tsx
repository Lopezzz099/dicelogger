"use client";

import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import React, { useState } from "react";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import TextArea from "@/components/common/inputs/TextArea";
import styles from "./WeaponForm.module.css";

type WeaponFormProps = {
  handleDisplay: (value: string) => void;
};

const categories = [
  "Armas c/c simples",
  "Armas c/c marciales",
  "Armas a distancia simples",
  "Armas a distancia marciales",
];
const damageTypes = [
  "Ácido",
  "Contundente",
  "Frío",
  "Fuego",
  "Fuerza",
  "Relámpago",
  "Necrótico",
  "Perforante",
  "Veneno",
  "Radiante",
  "Psíquico",
  "Cortante",
  "Trueno",
];
const WeaponForm = ({ handleDisplay }: WeaponFormProps) => {
  const [base, setBase] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [ammunition, setAmmunition] = useState(0);
  const [description, setDescription] = useState("");
  const [range, setRange] = useState("");
  const [damageType, setDamageType] = useState("");
  const [damage, setDamage] = useState("");
  const [versatileDamage, setVersatileDamage] = useState("");

  return (
    <section className={styles.weaponFormSection}>
      <div className={styles.weaponFormTitleBox}>
        <h3>Crear arma</h3>
        <Button onClick={() => handleDisplay("")}>Volver</Button>
      </div>
      <form className={styles.weaponForm}>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="base">
            Arma base
          </label>
          <Input
            type="text"
            name="base"
            placeholder="Escribe aquí..."
            value={base}
            onChange={(e) => setBase(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="category">
            Categoría
          </label>
          <Select
            placeholder="Elige una categoría"
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            value={category}
            onChange={(value) => setCategory(value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="name" className={formStyles.requiredLabel}>Nombre del arma</label>
          <Input
            type="text"
            name="name"
            placeholder="Escribe aquí..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="damageType">
            Tipo de daño
          </label>
          <Select
            placeholder="Elige un tipo de daño"
            options={damageTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            value={damageType}
            onChange={(value) => setDamageType(value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="damage">
            Daño (dado)
          </label>
          <Input
            type="text"
            name="damage"
            placeholder="Ej: 1d4"
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="versatileDamage">
            Daño versátil (dado)
          </label>
          <Input
            type="text"
            name="versatileDamage"
            placeholder="Ej: 1d8"
            value={versatileDamage}
            onChange={(e) => setVersatileDamage(e.target.value)}
          />
        </FormGroup>
        <FormGroup className={styles.descriptionField}>
          <label htmlFor="description">Descripción</label>
          <TextArea
            disableResize
            className={formStyles.textarea}
            name="description"
            placeholder="Escribe aquí..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="range">
            Alcance
          </label>
          <Input
            type="text"
            name="range"
            placeholder="Ej: 20/60"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="weight">
            Peso (kg)
          </label>
          <Input
            type="number"
            name="weight"
            placeholder="Escribe aquí..."
            value={weight.toString()}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="price">
            Precio (piezas de oro)
          </label>
          <Input
            type="number"
            name="price"
            placeholder="Escribe aquí..."
            value={price.toString()}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="ammunition">Munición</label>
          <Input
            type="number"
            name="ammunition"
            placeholder="Cantidad de municiones"
            value={ammunition.toString()}
            onChange={(e) => setAmmunition(parseInt(e.target.value))}
          />
        </FormGroup>
        <Button type="submit">
          Crear arma
        </Button>
      </form>
    </section>
  );
};

export default WeaponForm;
