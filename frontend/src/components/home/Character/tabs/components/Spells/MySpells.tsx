import React from "react";
import styles from "./MySpells.module.css";

import ExpandMenu from "../ExpandMenu/ExpandMenu";
import { Spell, Spell2 } from "../../Spells";
import SpellBook from "@/components/icons/SpellBook";
import { compareSpells } from "./AvailableSpells";

export type SpellFunction = (spell: Spell2) => void;

export interface mySpellsProps {
  spells: Spell2[];
  removeSpells: SpellFunction;
  addSpells?: SpellFunction;
  setEditSpell: React.Dispatch<React.SetStateAction<{}>>;
  editSpell: any;
  setOpenCreateMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateMenu: boolean;
  message: string;
}

const MySpells = ({
  spells,
  removeSpells,
  setEditSpell,
  editSpell,
  openCreateMenu,
  setOpenCreateMenu,
  message,
}: mySpellsProps) => {
  const onEdit = (sp: Spell2) => {
    // const spell = compareSpells(editSpell, sp);

    setOpenCreateMenu(!openCreateMenu);

    setEditSpell(sp);
  };

  return (
    <div className={styles.mySpellsContainer}>
      <h3>Mis conjuros</h3>
      <hr />

      <div className={styles.spellsContainer}>
        {spells.map((sp) => (
          <ExpandMenu
            key={sp.name}
            icon={<SpellBook size={40} />}
            name={sp.name}
            subtitle={`Nivel ${sp.level}, ${sp.school}`}
            content={{
              "Tiempo de lanzamiento": sp.casting_time,
              Alcance: sp.range + "metros",
              Duración: sp.duration,
              Descripción: sp.description,
            }}
            onDelete={() => removeSpells(sp)}
            onEdit={() => onEdit(sp)}
          />
        ))}
      </div>
      {message && spells.length === 0 ? (
        <p className={styles.noSpells}>{message}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default MySpells;
