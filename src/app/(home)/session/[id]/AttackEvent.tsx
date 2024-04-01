"use client";

import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import React, { useState } from "react";
import styles from "./AttackEvent.module.css";
import Button from "@/components/common/buttons/Button";
import formStyles from "@/components/home/NewLayout/Extra.module.css";

const bonuses = ["FUE", "DES", "-"];

const AttackEvent = () => {
  const [weapon, setWeapon] = useState("");
  const [target, setTarget] = useState("");
  const [bonus, setBonus] = useState(bonuses[0]);
  const [bonusExtra, setBonusExtra] = useState(0);
  const [extraDamage, setExtraDamage] = useState(0);
  const [proficient, setProficient] = useState(false);

  return (
    <form className={styles.attackForm}>
      <FormGroup className={styles.attackFormGroup}>
        <label htmlFor="weapon" className={formStyles.requiredLabel}>Arma</label>
        <Select
          placeholder="Elige un arma"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          value={weapon}
          maxHeigth="120px"
          onChange={(value) => setWeapon(value)}
          className={styles.attackFormInput}
        />
      </FormGroup>
      <FormGroup className={styles.attackFormGroup}>
        <label htmlFor="target" className={formStyles.requiredLabel}>Objetivo</label>
        <Select
          placeholder="Elige un objetivo"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          value={target}
          maxHeigth="120px"
          onChange={(value) => setTarget(value)}
          className={styles.attackFormInput}
        />
      </FormGroup>
      <div className={styles.attackGroup}>
        <FormGroup className={styles.attackFormGroup}>
          <label htmlFor="bonus" className={formStyles.requiredLabel}>Bonus</label>
          <Select
            placeholder="Elige un bonus"
            options={bonuses.map((bonus) => ({
              value: bonus === "-" ? "" : bonus,
              label: bonus,
            }))}
            maxHeigth="120px"
            value={bonus}
            onChange={(value) => setBonus(value)}
            className={styles.attackFormInput}
          />
        </FormGroup>
        <FormGroup className={styles.attackFormGroup}>
          <label htmlFor="bonusExtra">Bonus extra</label>
          <Input
            type="number"
            name="bonusExtra"
            placeholder="0"
            value={bonusExtra.toString()}
            onChange={(e) => setBonusExtra(parseInt(e.target.value))}
            className={styles.attackFormInput}
          />
        </FormGroup>
      </div>
      <div className={styles.attackGroup}>
        <FormGroup className={styles.attackFormGroup}>
          <label htmlFor="extraDamage">Daño extra</label>
          <Input
            type="number"
            name="extraDamage"
            placeholder="Ej: 1d20"
            value={extraDamage.toString()}
            onChange={(e) => setExtraDamage(parseInt(e.target.value))}
            className={styles.attackFormInput}
          />
        </FormGroup>
        <FormGroup className={styles.attackFormGroup}>
          <label htmlFor="proficient">Competencia</label>
          <div
            className={`${styles.switch} ${proficient ? styles.on : ""}`}
            onClick={() => setProficient(!proficient)}
          >
            <div className={styles.switchBall}></div>
          </div>
        </FormGroup>
      </div>
      <Button>Atacar</Button>
    </form>
  );
};

export default AttackEvent;
