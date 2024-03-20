"use client";
import React, { useState } from "react";
import styles from "./Spells.module.css";
import MySpells from "./components/Spells/MySpells";
import AvailableSpells from "./components/Spells/AvailableSpells";

export interface Spell {
  name: string;
  type: string;
  level: number;
  content: {
    "Tiempo de lanzamiento": string;
    Alcance: string;
    Duración: string;
    Descripción: string;
  };
}

const initialAvailableSpells: Spell[] = [
  {
    name: "Inmovilizar persona",
    type: "encantamiento",
    level: 2,

    content: {
      "Tiempo de lanzamiento": "10 minutos",
      Alcance: "30 pies",
      Duración: "instantánea",
      Descripción:
        "Hasta seis criaturas de tu elección, que puedas ver dentro del alcance, recuperan cada una, Puntos de Golpe igual a 2d8 + tú modificador de característica para lanzamiento de conjuros. Este conjuro no tiene efecto en muertos vivientes ni constructos. A niveles superiores. Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o superior, la curación se incrementa en 1d8 por cada nivel de espacio de conjuros por encima de nivel 2.",
    },
  },

  {
    name: "Oración de curación",
    type: "evocación",
    level: 2,

    content: {
      "Tiempo de lanzamiento": "10 minutos",
      Alcance: "30 pies",
      Duración: "instantánea",
      Descripción:
        "Hasta seis criaturas de tu elección, que puedas ver dentro del alcance, recuperan cada una, Puntos de Golpe igual a 2d8 + tú modificador de característica para lanzamiento de conjuros. Este conjuro no tiene efecto en muertos vivientes ni constructos. A niveles superiores. Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o superior, la curación se incrementa en 1d8 por cada nivel de espacio de conjuros por encima de nivel 2.",
    },
  },
  {
    name: "Bola de fuego",
    type: "evocación",
    level: 3,

    content: {
      "Tiempo de lanzamiento": "10 minutos",
      Alcance: "30 pies",
      Duración: "instantánea",
      Descripción:
        "Hasta seis criaturas de tu elección, que puedas ver dentro del alcance, recuperan cada una, Puntos de Golpe igual a 2d8 + tú modificador de característica para lanzamiento de conjuros. Este conjuro no tiene efecto en muertos vivientes ni constructos. A niveles superiores. Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o superior, la curación se incrementa en 1d8 por cada nivel de espacio de conjuros por encima de nivel 2.",
    },
  },
];

const initialMySpells: Spell[] = [];

const Spells = () => {
  const [mySpells, setMySpells] = useState<Spell[]>(initialMySpells);
  const [availableSpells, setAvailableSpells] = useState<Spell[]>(
    initialAvailableSpells
  );

  const addSpells = (spell: Spell) => {
    if (!mySpells.includes(spell)) {
      setMySpells([...mySpells, spell]);
    }
    if (!availableSpells.includes(spell)) {
      setAvailableSpells([...availableSpells, spell]);
    }
  };

  const removeSpells = (spellToRemove: Spell) => {
    setMySpells(mySpells.filter((spell) => spell !== spellToRemove));
  };

  const removeFromAvailable = (spellToRemove: Spell) => {
    setAvailableSpells(
      availableSpells.filter((spell) => spell !== spellToRemove)
    );
  };
  return (
    <div className={styles.spellsContainer}>
      <section className={styles.characterInfo}>
        <div>
          <span>Aptitud mágica</span>
          <h4>Inteligencia</h4>
        </div>
        <div>
          <span>Tirada de salvación</span>
          <h4>13</h4>
        </div>
        <div>
          <span>Bonus de ataque</span>
          <h4>+5</h4>
        </div>
      </section>
      <div className={styles.characterSpells}>
        <MySpells spells={mySpells} removeSpells={removeSpells} />
        <AvailableSpells
          spells={availableSpells}
          addSpells={addSpells}
          removeFromAvailable={removeFromAvailable}
        />
      </div>
    </div>
  );
};

export default Spells;
