"use client";

import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import React, { FormEvent, useState } from "react";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import TextArea from "@/components/common/inputs/TextArea";
import styles from "./WeaponForm.module.css";
import { WeaponReq } from "@/app/api/characters/weapons/route";

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

type WeaponFormProps = {
  handleDisplay: (value: string) => void;
  characterId: number;
  handleWeapons: (value: any | any[]) => void
  weapons: any[]
  weaponId: number | null
};

const WeaponForm = ({ handleDisplay, characterId, handleWeapons, weapons, weaponId }: WeaponFormProps) => {
  const [base, setBase] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.weapon_type : "");
  const [category, setCategory] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.category : "");
  const [name, setName] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.name : "");
  const [weight, setWeight] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.weight : 0);
  const [price, setPrice] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.price : 0);
  const [ammunition, setAmmunition] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.ammunition : 0);
  const [description, setDescription] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.description : "");
  const [range, setRange] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.reach : 0);
  const [damageType, setDamageType] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.damage_type : "");
  const [damage, setDamage] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.damage : "");
  const [versatileDamage, setVersatileDamage] = useState(weaponId ? weapons.find((weapon) => weapon.weapon.weapon_id === weaponId)?.weapon.veratile_damage : "");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if (weaponId) {
      await updateWeapon()
    } else {
      await createWeapon()
    }
  };

  const createWeapon = async () => {
    const weapon: WeaponReq = {
      character_data_id: characterId,
      weapon_type: base,
      name,
      weight,
      price,
      category,
      reach: range,
      description,
      damage,
      versatile_damage: versatileDamage,
      damage_type: damageType,
      ammunition,
    };

    console.log(weapon);

    const response = await fetch("/api/characters/weapons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weapon),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setError(false);
      setIsLoading(false);
      handleWeapons([...weapons, data.data]);
      handleDisplay("")
    } else {
      setError(true);
      setIsLoading(false);
    }
  }

  const updateWeapon = async () => {
    const weapon: WeaponReq = {
      weapon_type: base,
      name,
      weight,
      price,
      category,
      reach: range,
      description,
      damage,
      versatile_damage: versatileDamage,
      damage_type: damageType,
      ammunition,
    };

    console.log(weapon);

    const response = await fetch("/api/characters/weapons/" + weaponId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weapon),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setError(false);
      setIsLoading(false);
      const newWeapons = [...weapons];
      const updatedWeapon = newWeapons.findIndex((weapon) => weapon.weapon.weapon_id === weaponId);
      newWeapons[updatedWeapon].weapon = data.data;
      handleWeapons(newWeapons);
      handleDisplay("")
    } else {
      setError(true);
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.weaponFormSection}>
      <div className={styles.weaponFormTitleBox}>
        <h3>{weaponId ? "Editar arma" : "Crear arma"}</h3>
        <Button onClick={() => handleDisplay("")}>Volver</Button>
      </div>
      <form className={styles.weaponForm} onSubmit={handleSubmit}>
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
          <label htmlFor="name" className={formStyles.requiredLabel}>
            Nombre del arma
          </label>
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
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="versatileDamage">
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
        {error && (
          <p className={styles.errorMessage}>
            Halgo salío mal. Intenta de nuevo en otro momento.
          </p>
        )}
        <Button type="submit">
          {isLoading ? weaponId ? "Editando arma..." : "Creando arma..." : weaponId ? "Editar arma" : "Crear arma"}
        </Button>
      </form>
    </section>
  );
};

export default WeaponForm;
