"use client";

import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import React, { FormEvent, useState } from "react";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import TextArea from "@/components/common/inputs/TextArea";
import styles from "./WeaponForm.module.css";

type ArmorFormProps = {
  handleDisplay: (value: string) => void;
};

const categories = ["Botas", "Pantalones", "Peto", "Casco", "Escudo"];

const protectionTypes = ["Armadura", "Escudo", "Esquiva", "Magia"];

const dexBonuses = ["Ninguno", "Completo", "Máximo 2"];

const penalties = ["Ninguna", "Desventaja"];

const ArmorForm = ({ handleDisplay }: ArmorFormProps) => {
  const [base, setBase] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [protectionType, setProtectionType] = useState("");
  const [dexBonus, setDexBonus] = useState(dexBonuses[0]);
  const [penalty, setPenalty] = useState(penalties[0]);
  const [strength, setStrength] = useState(0);
  const [armorClass, setArmorClass] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const armor = {
      name,
      price,
      weight,
      category,
      protection_type: protectionType,
      description,
      penalty,
      strength,
      armor_class: armorClass,
      dex_bonus: dexBonus,
      campaign_id: null
    }

    console.log(armor);
  }

  return (
    <section className={styles.weaponFormSection}>
      <div className={styles.weaponFormTitleBox}>
        <h3>Crear armadura</h3>
        <Button onClick={() => handleDisplay("")}>Volver</Button>
      </div>
      <form className={styles.weaponForm} onSubmit={handleSubmit}>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="base">
            Material base
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
          <label htmlFor="name" className={formStyles.requiredLabel}>Nombre de la armadura</label>
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
          <label className={formStyles.requiredLabel} htmlFor="protectionType">
            Tipo de protección
          </label>
          <Select
            placeholder="Elige un tipo de protección"
            options={protectionTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            value={protectionType}
            onChange={(value) => setProtectionType(value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="penalty">
            Penalización
          </label>
          <Select
            placeholder="Elige un tipo de penalización"
            options={penalties.map((type) => ({
              value: type,
              label: type,
            }))}
            value={penalty}
            onChange={(value) => setPenalty(value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="dexBonus">
            Bonificador de destreza
          </label>
          <Select
            placeholder="Elige un tipo de bonus"
            options={dexBonuses.map((type) => ({
              value: type,
              label: type,
            }))}
            value={dexBonus}
            onChange={(value) => setDexBonus(value)}
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
          <label htmlFor="strength" className={formStyles.requiredLabel}>
            Fuerza
          </label>
          <Input
            type="number"
            name="strength"
            placeholder="Fuerza necesaria"
            value={strength.toString()}
            onChange={(e) => setStrength(parseInt(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="armorClass" className={formStyles.requiredLabel}>
            Clase de armadura
          </label>
          <Input
            type="number"
            name="armorClass"
            placeholder="Escribe aquí..."
            value={armorClass.toString()}
            onChange={(e) => setArmorClass(parseInt(e.target.value))}
            required
          />
        </FormGroup>
        <Button type="submit">
          Crear armadura
        </Button>
      </form>
    </section>
  );
};

export default ArmorForm;
