"use client";

import React, { useState } from "react";
import styles from "./SpellEvent.module.css";
import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import MultiSelect from "@/components/common/inputs/MultiSelect";
import formStyles from "@/components/home/NewLayout/Extra.module.css";

const bonuses = ["FUE", "DES", "CON", "INT", "SAB", "CAR"];

const SpellEvent = () => {
  const [spell, setSpell] = useState("");
  const [targets, setTargets] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [dice, setDice] = useState("1d8");
  const [bonusExtra, setBonusExtra] = useState(0);
  const [attack, setAttack] = useState(false);

  return (
    <form className={styles.spellForm}>
      <FormGroup className={styles.spellFormGroup}>
        <label htmlFor="spell" className={formStyles.requiredLabel}>
          Conjuro
        </label>
        <Select
          placeholder="Elige un conjuro"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          maxHeigth="250px"
          value={spell}
          onChange={(value) => setSpell(value)}
          className={styles.spellFormInput}
        />
      </FormGroup>
      <FormGroup className={styles.spellFormGroup}>
        <label htmlFor="target" className={formStyles.requiredLabel}>
          Objetivos
        </label>
        <MultiSelect
          placeholder="Elige objetivos"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          selectedOptions={selectedTargets}
          maxHeigth="250px"
          onChange={(value) => setTargets([...targets])}
          className={styles.spellFormInput}
        />
      </FormGroup>
      <div className={styles.spellGroup}>
        <FormGroup className={styles.spellFormGroup}>
          <label htmlFor="dice" className={formStyles.requiredLabel}>
            Dado
          </label>
          <Input
            required
            type="text"
            name="dice"
            placeholder="1d8"
            value={dice}
            onChange={(e) => setDice(e.target.value)}
            className={styles.spellFormInput}
          />
        </FormGroup>
        <FormGroup className={styles.spellFormGroup}>
          <label htmlFor="bonusExtra">Bonus extra</label>
          <Input
            type="number"
            name="bonusExtra"
            placeholder="0"
            value={bonusExtra.toString()}
            onChange={(e) => setBonusExtra(parseInt(e.target.value))}
            className={styles.spellFormInput}
          />
        </FormGroup>
      </div>
      <FormGroup className={styles.spellFormGroup}>
        <label htmlFor="attack">Ataque</label>
        <div
          className={`${styles.switch} ${attack ? styles.on : ""}`}
          onClick={() => setAttack(!attack)}
        >
          <div className={styles.switchBall}></div>
        </div>
      </FormGroup>
      <Button>Lanzar hechizo</Button>
    </form>
  );
};

export default SpellEvent;
