"use client";

import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import React, { useState } from "react";
import styles from "./DiceEvent.module.css";
import Button from "@/components/common/buttons/Button";
import formStyles from "@/components/home/NewLayout/Extra.module.css";

const rolls = ["Salvacion", "Habilidad", "Acción"];
const bonuses = ["FUE", "DES", "CON", "INT", "SAB", "CAR", "-"];

const DiceEvent = () => {
  const [roll, setRoll] = useState(rolls[0]);
  const [bonus, setBonus] = useState(bonuses[0]);
  const [bonusExtra, setBonusExtra] = useState(0);
  const [dice, setDice] = useState("1d20");
  const [surpass, setSurpass] = useState(0);
  const [description, setDescription] = useState("")

  return (
    <form className={styles.diceForm}>
      <div className={styles.diceFormGroup}>
        <FormGroup className={styles.formGroup}>
          <label htmlFor="roll" className={formStyles.requiredLabel}>Tipo de tirada</label>
          <Select
            placeholder="Elige una tirada"
            options={rolls.map((roll) => ({
              value: roll,
              label: roll,
            }))}
            value={roll}
            maxHeigth="120px"
            onChange={(value: any) => setRoll(value)}
            className={styles.diceFormInput}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <label htmlFor="bonus" className={formStyles.requiredLabel}>Bonus</label>
          <Select
            placeholder="Elige un bonus"
            options={bonuses.map((bonus) => ({
              value: bonus,
              label: bonus,
            }))}
            maxHeigth="120px"
            value={bonus}
            onChange={(value: any) => setBonus(value)}
            className={styles.diceFormInput}
          />
        </FormGroup>
      </div>
      <div className={styles.diceFormGroup}>
        <FormGroup className={styles.formGroup}>
          <label htmlFor="bonusExtra">Bonus extra</label>
          <Input
            type="number"
            name="bonusExtra"
            placeholder="0"
            value={bonusExtra.toString()}
            onChange={(e) => setBonusExtra(parseInt(e.target.value))}
            className={styles.diceFormInput}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <label htmlFor="dice" className={formStyles.requiredLabel}>Dado</label>
          <Input
            type="text"
            name="dice"
            placeholder="Ej: 1d20"
            value={dice}
            onChange={(e) => setDice(e.target.value)}
            className={styles.diceFormInput}
            required
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <label htmlFor="surpass" className={formStyles.requiredLabel}>Superar</label>
          <Input
            type="number"
            name="surpass"
            placeholder="0"
            value={surpass.toString()}
            onChange={(e) => setSurpass(parseInt(e.target.value))}
            className={styles.diceFormInput}
            required
          />
        </FormGroup>
      </div>
      {roll === "Acción" && <div className={styles.diceFormGroup}>
        <FormGroup className={styles.formGroup}>
          <label htmlFor="description">Descripción</label>
          <Input
            type="text"
            name="description"
            placeholder="Describe la acción..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.diceFormInput}
          />
        </FormGroup>
      </div>}
      <Button>Lanzar dado</Button>
    </form>
  );
};

export default DiceEvent;
