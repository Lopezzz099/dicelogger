"use client";

import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import React, { useState } from "react";
import EventForm from "./EventForm";
import styles from "./page.module.css";

const bonuses = ["FUE", "DES", "CON", "INT", "SAB", "CAR"];

const AttackEvent = () => {
  const [weapon, setWeapon] = useState("");
  const [target, setTarget] = useState("");
  const [bonus, setBonus] = useState(bonuses[0]);
  const [bonusExtra, setBonusExtra] = useState(0);
  const [dice, setDice] = useState("1d20");
  const [extraDamage, setExtraDamage] = useState(0);
  const [proficient, setProficient] = useState(false);

  return (
    <EventForm
      btnText="Atacar"
      handleSubmit={() => {}}
      formClassname={styles.attackForm}
    >
      <FormGroup>
        <label htmlFor="weapon">Arma</label>
        <Select
          placeholder="Elige un arma"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          value={weapon}
          maxHeigth="120px"
          onChange={(value) => setWeapon(value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="target">Objetivo</label>
        <Select
          placeholder="Elige un objetivo"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          value={target}
          maxHeigth="120px"
          onChange={(value) => setTarget(value)}
        />
      </FormGroup>
      <div className={styles.attackGroup}>
        <FormGroup>
          <label htmlFor="bonus">Bonus</label>
          <Select
            placeholder="Elige un bonus"
            options={bonuses.map((bonus) => ({
              value: bonus,
              label: bonus,
            }))}
            maxHeigth="120px"
            value={bonus}
            onChange={(value) => setBonus(value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="bonusExtra">Bonus extra</label>
          <Input
            type="number"
            name="bonusExtra"
            placeholder="0"
            value={bonusExtra.toString()}
            onChange={(e) => setBonusExtra(parseInt(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="extraDamage">Daño extra</label>
          <Input
            type="number"
            name="extraDamage"
            placeholder="Ej: 1d20"
            value={extraDamage.toString()}
            onChange={(e) => setExtraDamage(parseInt(e.target.value))}
          />
        </FormGroup>
      </div>
      <FormGroup>
        <label htmlFor="proficient">Competencia</label>
        <div className={`${styles.switch} ${proficient ? styles.on : ""}`} onClick={() => setProficient(!proficient)}>
          <div className={styles.switchBall}></div>
        </div>
      </FormGroup>
    </EventForm>
  );
};

export default AttackEvent;
