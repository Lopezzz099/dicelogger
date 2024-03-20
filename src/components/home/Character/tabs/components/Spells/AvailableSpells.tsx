"use client";

import React, { useState } from "react";
import styles from "./AvailableSpells.module.css";
import Input from "@/components/common/inputs/Input";
import Search from "@/components/icons/ui/Search";
import FilterButton from "@/components/home/List/FilterButton";

import Add from "@/components/icons/ui/Add";
import Button from "@/components/common/buttons/Button";
import ExpandMenu from "../ExpandMenu/ExpandMenu";
import { SpellFunction } from "./MySpells";
import CreateSpell from "./CreateSpell";
import { Spell } from "../../Spells";
import SpellBook from "@/components/icons/SpellBook";

export interface availableSpellsProps {
  spells: Spell[];
  addSpells?: SpellFunction;
  removeFromAvailable: SpellFunction;
}

const AvailableSpells = ({
  spells,
  addSpells,
  removeFromAvailable,
}: availableSpellsProps) => {
  const [openCreateMenu, setOpenCreateMenu] = useState(false);

  return (
    <div className={styles.avSpellsContainer}>
      <h3>{openCreateMenu ? "Crear conjuro" : "Conjuros disponibles"}</h3>
      <hr />

      {!openCreateMenu ? (
        <>
          <div className={styles.searchContainer}>
            <Input className={styles.search} placeholder="Buscar">
              <Search size="35px" color="white" />
            </Input>
            <FilterButton />
          </div>
          <div className={styles.spellsContainer}>
            <div className={styles.spellsContainer}>
              {spells.map((sp) => (
                <ExpandMenu
                  icon={<SpellBook size={40} />}
                  name={sp.name}
                  type={sp.type}
                  level={sp.level}
                  content={sp.content}
                  onDelete={() => removeFromAvailable(sp)}
                  additionalButton={
                    addSpells && (
                      <Button onClick={() => addSpells(sp)}>Agregar</Button>
                    )
                  }
                />
              ))}
            </div>
          </div>
          <hr />
          <div className={styles.addSpellContainer}>
            <h3>Crear un conjuro personalizado</h3>
            <div
              className={styles.addSpellBtn}
              onClick={() => setOpenCreateMenu(!openCreateMenu)}
            >
              <Add color="white" />
            </div>
          </div>
        </>
      ) : (
        <CreateSpell
          addSpells={addSpells}
          setOpenCreateMenu={setOpenCreateMenu}
          openCreateMenu={openCreateMenu}
        />
      )}
    </div>
  );
};

export default AvailableSpells;
