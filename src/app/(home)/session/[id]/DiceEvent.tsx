"use client";

import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import React, { useState } from "react";
import EventForm from "./EventForm";
import styles from "./page.module.css";

const rolls = ["Salvacion", "Habilidad", "Acción"];
const bonuses = ["FUE", "DES", "CON", "INT", "SAB", "CAR"];

const DiceEvent = () => {
  const [roll, setRoll] = useState(rolls[0]);
  const [bonus, setBonus] = useState(bonuses[0]);
  const [bonusExtra, setBonusExtra] = useState(0);
  const [dice, setDice] = useState("1d20");
  const [surpass, setSurpass] = useState(0);

  return (
    <EventForm btnText="Lanzar dado" handleSubmit={() => {}} formClassname={styles.diceForm}>
      <FormGroup>
        <label htmlFor="roll">Tipo de tirada</label>
        <Select
          placeholder="Elige una tirada"
          options={rolls.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          value={roll}
          maxHeigth="120px"
          onChange={(value) => setRoll(value)}
        />
      </FormGroup>
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
        <label htmlFor="dice">Dado</label>
        <Input
          type="text"
          name="dice"
          placeholder="Ej: 1d20"
          value={dice}
          onChange={(e) => setDice(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="surpass">Superar</label>
        <Input
          type="number"
          name="surpass"
          placeholder="0"
          value={surpass.toString()}
          onChange={(e) => setSurpass(parseInt(e.target.value))}
        />
      </FormGroup>
    </EventForm>
  );
};

export default DiceEvent;
