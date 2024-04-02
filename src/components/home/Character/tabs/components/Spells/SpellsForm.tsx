"use client";

import React, { FormEvent, useState } from "react";
import styles from "./SpellsForm.module.css";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import TextArea from "@/components/common/inputs/TextArea";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import Input from "@/components/common/inputs/Input";
import Select from "@/components/common/inputs/Select";
import Button from "@/components/common/buttons/Button";
import { Spell, Spell2 } from "../../Spells";

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
  editSpell?: Spell2;
  fetchSpells: () => void;
};

const SpellsForm = ({
  addSpells,
  closeForm,
  editSpell,
  fetchSpells,
}: SpellsFromProps) => {
  const initialSpellState: Spell = {
    name: editSpell ? editSpell.name : "",
    description: editSpell ? editSpell.name : "",
    range: editSpell ? editSpell.range : 0,
    ritual: editSpell ? editSpell.ritual : false,
    duration: editSpell ? editSpell.duration : "",
    concentration: editSpell ? editSpell.concentration : false,
    casting_time: editSpell ? editSpell.casting_time : "",
    level: editSpell ? editSpell.level : 1,
    damage_type: editSpell ? editSpell.damage_type : "",
    difficulty_class: editSpell ? editSpell.difficulty_class : 1,
    aoe: editSpell ? editSpell.aoe : 0,
    school: editSpell ? editSpell.school : "",
  };

  const [spellData, setSpellData] = useState(initialSpellState);

  const updateSpell = async (spell: any) => {
    try {
      const body = {
        name: spell.name,
        description: spell.description,
        range: spell.range,
        ritual: spell.ritual,
        duration: spell.duration,
        concentration: spell.concentration,
        casting_time: spell.casting_time,
        level: spell.level,
        damage_type: spell.damage_type,
        difficulty_class: spell.difficulty_class,
        aoe: spell.aoe,
        school: spell.school,
      };

      const response = await fetch(`/api/spell/${editSpell?.spell_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response && response.status === 200) {
        fetchSpells();
      } else {
        throw new Error("Failed to add spell");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const spell = {
      name: spellData.name,
      description: spellData.description,
      range: spellData.range,
      ritual: spellData.ritual,
      duration: spellData.duration,
      concentration: spellData.concentration,
      casting_time: spellData.casting_time,
      level: spellData.level,
      damage_type: spellData.damage_type,
      difficulty_class: spellData.difficulty_class,
      aoe: spellData.aoe,
      school: spellData.school,
    };
    if (!editSpell?.name) {
      addSpells && addSpells(spell);
    } else {
      updateSpell(spell);
    }

    closeForm();
    console.log(spellData);
  };

  console.log(spellData);

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
            value={spellData.name}
            onChange={(e) =>
              setSpellData({ ...spellData, name: e.target.value })
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
            value={spellData.school}
            onChange={(value) => setSpellData({ ...spellData, school: value })}
          />
        </FormGroup>

        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="durationTime">
            Tiempo de duración
          </label>
          <Input
            type="text"
            name="duration"
            placeholder="Escribe aquí..."
            value={spellData.duration}
            onChange={(e) =>
              setSpellData({ ...spellData, duration: e.target.value })
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
            name="casting_time"
            placeholder="Escribe aquí..."
            value={spellData.casting_time}
            onChange={(e) =>
              setSpellData({
                ...spellData,
                casting_time: e.target.value,
              })
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
            value={spellData?.level?.toString()}
            onChange={(value) =>
              setSpellData({ ...spellData, level: parseInt(value) })
            }
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
            value={spellData?.range?.toString()}
            onChange={(e) =>
              setSpellData({
                ...spellData,
                range: parseInt(e.target.value),
              })
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
                checked={spellData.ritual}
                onChange={(e) =>
                  setSpellData({ ...spellData, ritual: e.target.checked })
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
            {editSpell?.name ? "Editar conjuro" : "Crear conjuro"}
          </Button>
        </div>
      </form>
      <div className={styles.separator}></div>
      <div className={styles.existentSpells}>
        {!editSpell && (
          <Button onClick={() => closeForm()}>
            Elegir un conjuro existente
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpellsForm;
