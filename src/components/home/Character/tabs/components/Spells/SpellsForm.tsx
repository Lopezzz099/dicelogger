"use client";

import React, { FormEvent, useState } from "react";
import styles from "./SpellsForm.module.css";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import TextArea from "@/components/common/inputs/TextArea";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import Button from "@/components/common/buttons/Button";
import { Spell } from "../../Spells";

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
  editSpell?: Spell;
};

const initialSpellState = {
  spellName: "",
  selectedType: "",
  durationTime: "",
  castingTime: "",
  level: "",
  reach: "",
  description: "",
  rite: false,
  concentration: false,
};

const SpellsForm = ({ addSpells, closeForm, editSpell }: SpellsFromProps) => {
  const [spellData, setSpellData] = useState(initialSpellState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const spell = {
      name: spellData.spellName,
      level: spellData.level,
      type: spellData.selectedType,
      content: {
        "Tiempo de lanzamiento": spellData.castingTime,
        Alcance: spellData.reach + " pies",
        Duración: spellData.durationTime,
        Descripción: spellData.description,
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
            value={spellData.spellName}
            onChange={(e) =>
              setSpellData({ ...spellData, spellName: e.target.value })
            }
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
            value={spellData.selectedType}
            onChange={(value) =>
              setSpellData({ ...spellData, selectedType: value })
            }
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
            value={spellData.durationTime}
            onChange={(e) =>
              setSpellData({ ...spellData, durationTime: e.target.value })
            }
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
            value={spellData.castingTime}
            onChange={(e) =>
              setSpellData({ ...spellData, castingTime: e.target.value })
            }
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
            value={spellData.level}
            onChange={(value) => setSpellData({ ...spellData, level: value })}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="reach">
            Alcance
          </label>
          <Input
            type="number"
            name="reach"
            placeholder="Escribe aquí..."
            value={spellData.reach}
            onChange={(e) =>
              setSpellData({ ...spellData, reach: e.target.value })
            }
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
            value={spellData.description}
            onChange={(e) =>
              setSpellData({ ...spellData, description: e.target.value })
            }
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
                checked={spellData.rite}
                onChange={(e) =>
                  setSpellData({ ...spellData, rite: e.target.checked })
                }
                className={styles.customCheckbox}
              />
            </div>
            <div className={styles.spellFormCheck}>
              <label htmlFor="concentration">Concentración</label>
              <input
                type="checkbox"
                name="concentration"
                id="concentration"
                checked={spellData.concentration}
                onChange={(e) =>
                  setSpellData({
                    ...spellData,
                    concentration: e.target.checked,
                  })
                }
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
