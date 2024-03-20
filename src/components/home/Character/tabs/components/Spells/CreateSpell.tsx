import React from "react";
import SpellsForm from "./SpellsForm";
import { Spell } from "../../Spells";

type SpellFunction = (spell: Spell) => void;

export interface createSpellProps {
  addSpells?: SpellFunction;
  openCreateMenu: boolean;
  setOpenCreateMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSpell = ({
  addSpells,
  openCreateMenu,
  setOpenCreateMenu,
}: createSpellProps) => {
  const closeForm = () => {
    setOpenCreateMenu(!openCreateMenu);
  };
  return (
    <>
      <SpellsForm addSpells={addSpells} closeForm={closeForm} />
    </>
  );
};

export default CreateSpell;
