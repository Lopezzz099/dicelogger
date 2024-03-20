"use client";

import React, { FormEvent, useState } from "react";
import styles from "./SpellsForm.module.css";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import TextArea from "@/components/common/inputs/TextArea";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import Button from "@/components/common/buttons/Button";

const spellTypes = [
  "Adivinación",
  "Abjuración",
  "Conjuración",
  "Encantamiento",
  "Evocación",
  "Ilusión",
  "Nigromancia",
  "Transmutación",
];
const spellsLevels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

type SpellsFromProps = {
  addSpells?: (spell: any) => void;
  closeForm: () => void;
};

const SpellsForm = ({ addSpells, closeForm }: SpellsFromProps) => {
  const [spellName, setSpellName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [durationTime, setDurationTime] = useState("");
  const [castingTime, setCastingTime] = useState("");
  const [level, setLevel] = useState("");
  const [reach, setReach] = useState("");
  const [description, setDescription] = useState("");
  const [rite, setRite] = useState(false);
  const [concentration, setConcentration] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const spell = {
      name: spellName,
      level: level,
      type: selectedType,
      content: {
        "Tiempo de lanzamiento": castingTime,
        Alcance: reach + " pies",
        Duración: durationTime,
        Descripción: description,
      },
    };

    addSpells && addSpells(spell);
    closeForm();
  };

  return (
    <div className={styles.createSpell}>
      <form className={styles.spellForm} onSubmit={handleSubmit}>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="name">
            Nombre
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Escribe aquí..."
            value={spellName}
            onChange={(e) => setSpellName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="type">
            Tipo
          </label>
          <Select
            placeholder="Elige un tipo"
            options={spellTypes.map((type) => ({ value: type, label: type }))}
            value={selectedType}
            onChange={(value) => setSelectedType(value)}
          />
        </FormGroup>

        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="durationTime">
            Tiempo de duración
          </label>
          <Input
            type="text"
            name="durationTime"
            placeholder="Escribe aquí..."
            value={durationTime}
            onChange={(e) => setDurationTime(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="castingTime">
            Tiempo de lanzamiento
          </label>
          <Input
            type="text"
            name="castingTime"
            placeholder="Escribe aquí..."
            value={castingTime}
            onChange={(e) => setCastingTime(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="level">
            Nivel
          </label>
          <Select
            placeholder="Elige un nivel"
            options={spellsLevels.map((level) => ({
              value: level,
              label: "Nivel " + level,
            }))}
            value={level}
            onChange={(value) => setLevel(value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="reach">
            Alcance
          </label>
          <Input
            type="text"
            name="reach"
            placeholder="Escribe aquí..."
            value={reach}
            onChange={(e) => setReach(e.target.value)}
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
        <div className={styles.spellFormLastRow}>
          <div className={styles.spellFormChecks}>
            <div className={styles.spellFormCheck}>
              <label htmlFor="rite">Es ritual</label>
              <input
                type="checkbox"
                name="rite"
                id="rite"
                checked={rite}
                onChange={(e) => setRite(e.target.checked)}
                className={styles.customCheckbox}
              />
            </div>
            <div className={styles.spellFormCheck}>
              <label htmlFor="concentration">Concentración</label>
              <input
                type="checkbox"
                name="concentration"
                id="concentration"
                checked={concentration}
                onChange={(e) => setConcentration(e.target.checked)}
                className={styles.customCheckbox}
              />
            </div>
          </div>

          <Button className={styles.spellFormButton} type="submit">
            Crear conjuro
          </Button>
        </div>
      </form>
      <div className={styles.separator}></div>
      <div className={styles.existentSpells}>
        <Button onClick={() => closeForm()}>Elegir un conjuro existente</Button>
      </div>
    </div>
  );
};

export default SpellsForm;
