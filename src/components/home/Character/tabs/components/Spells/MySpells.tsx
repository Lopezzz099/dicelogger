import React from "react";
import styles from "./MySpells.module.css";

import ExpandMenu from "../ExpandMenu/ExpandMenu";
import { Spell } from "../../Spells";
import SpellBook from "@/components/icons/SpellBook";

export type SpellFunction = (spell: Spell) => void;

export interface mySpellsProps {
  spells: Spell[];
  removeSpells: SpellFunction;
  addSpells?: SpellFunction;
}

const MySpells = ({ spells, removeSpells }: mySpellsProps) => {
  return (
    <div className={styles.mySpellsContainer}>
      <h3>Mis conjuros</h3>
      <hr />
      {spells.length > 0 ? (
        <div className={styles.spellsContainer}>
          {spells.map((sp) => (
            <ExpandMenu
              icon={<SpellBook size={40} />}
              name={sp.name}
              type={sp.type}
              level={sp.level}
              content={sp.content}
              onDelete={() => removeSpells(sp)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noSpells}>No se encontraron conjuros</p>
      )}
    </div>
  );
};

export default MySpells;
