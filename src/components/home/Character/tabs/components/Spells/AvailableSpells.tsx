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
  mySpells: Spell[];
  addSpells?: SpellFunction;
  removeFromAvailable: SpellFunction;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const AvailableSpells = ({
  spells,
  mySpells,
  addSpells,
  removeFromAvailable,
  onChange,
  searchQuery,
}: availableSpellsProps) => {
  const [openCreateMenu, setOpenCreateMenu] = useState(false);

  const isSpellAdded = (spell: Spell) => {
    return mySpells.includes(spell);
  };

  return (
    <div className={styles.avSpellsContainer}>
      <h3>{openCreateMenu ? "Crear conjuro" : "Conjuros disponibles"}</h3>
      <hr />

      {!openCreateMenu ? (
        <>
          <div className={styles.searchContainer}>
            <Input
              className={styles.search}
              placeholder="Buscar"
              onChange={onChange}
              value={searchQuery}
            >
              <Search size="35px" color="white" />
            </Input>
            {/* <FilterButton /> */}
          </div>
          <div className={styles.spellsContainer}>
            <div className={styles.spellsContainer}>
              {spells.map((sp) => (
                <ExpandMenu
                  icon={<SpellBook size={40} />}
                  name={sp.name}
                  subtitle={`Nivel ${sp.level}, ${sp.type}`}
                  key={sp.name}
                  content={sp.content}
                  onDelete={() => removeFromAvailable(sp)}
                  additionalButton={
                    addSpells && (
                      <Button
                        className={isSpellAdded(sp) ? styles.added : ""}
                        onClick={() => {
                          addSpells(sp);
                        }}
                      >
                        {isSpellAdded(sp) ? "Agregado" : "Agregar"}
                      </Button>
                    )
                  }
                  actionButtons={false}
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
