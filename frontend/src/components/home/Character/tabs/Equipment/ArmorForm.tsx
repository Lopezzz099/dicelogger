"use client";

import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import React, { FormEvent, useState } from "react";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import TextArea from "@/components/common/inputs/TextArea";
import styles from "./WeaponForm.module.css";
import { ArmorReq } from "@/app/api/characters/armors/route";

type ArmorFormProps = {
  handleDisplay: (value: string) => void;
  characterId: number;
  handleArmors: (value: any | any[]) => void
  armors: any[]
  armorId: number | null
};

const categories = ["Botas", "Pantalones", "Peto", "Casco", "Escudo"];

const protectionTypes = ["Armadura", "Escudo", "Esquiva", "Magia"];

const dexBonuses = ["Ninguno", "Completo", "Máximo 2"];

const penalties = ["Ninguna", "Desventaja"];

const ArmorForm = ({ handleDisplay, handleArmors, armors, armorId, characterId }: ArmorFormProps) => {
  const [base, setBase] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.material : "");
  const [category, setCategory] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.category : "");
  const [name, setName] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.name : "");
  const [weight, setWeight] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.weight : 0);
  const [price, setPrice] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.price : 0);
  const [description, setDescription] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.description : "");
  const [protectionType, setProtectionType] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.protection_type : "");
  const [dexBonus, setDexBonus] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.dex_bonus : dexBonuses[0]);
  const [penalty, setPenalty] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.penalty : penalties[0]);
  const [strength, setStrength] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.strength : 0);
  const [armorClass, setArmorClass] = useState(armorId ? armors.find((armor) => armor.armor.armor_id === armorId)?.armor.armor_class : 0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if (armorId) {
      await updateArmor()
    } else {
      await createArmor()
    }
  };

  const createArmor= async () => {
    const armor: ArmorReq = {
      character_data_id: characterId,
      material: base,
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
    }

    console.log(armor);

    const response = await fetch("/api/characters/armors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(armor),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setError(false);
      setIsLoading(false);
      handleArmors([...armors, data.data]);
      handleDisplay("")
    } else {
      setError(true);
      setIsLoading(false);
    }
  }

  const updateArmor = async () => {
    const armor: ArmorReq = {
      material: base,
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
    }

    console.log(armor);

    const response = await fetch("/api/characters/armors/" + armorId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(armor),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setError(false);
      setIsLoading(false);
      const newArmors = [...armors];
      const updatedArmor = newArmors.findIndex((armor) => armor.armor.armor_id === armorId);
      newArmors[updatedArmor].armor = data.data;
      handleArmors(newArmors);
      handleDisplay("")
    } else {
      setError(true);
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.weaponFormSection}>
      <div className={styles.weaponFormTitleBox}>
        <h3>{armorId ? "Editar armadura" : "Crear armadura"}</h3>
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
        {error && (
          <p className={styles.errorMessage}>
            Halgo salío mal. Intenta de nuevo en otro momento.
          </p>
        )}
        <Button type="submit">
          {isLoading ? armorId ? "Editando armadura..." : "Creando armadura..." : armorId ? "Editar armadura" : "Crear armadura"}
        </Button>    
      </form>
    </section>
  );
};

export default ArmorForm;
