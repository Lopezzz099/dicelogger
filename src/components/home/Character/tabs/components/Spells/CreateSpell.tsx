import React from "react";
import SpellsForm from "./SpellsForm";
import { Spell, Spell2 } from "../../Spells";

type SpellFunction = (spell: Spell2) => void;

export interface createSpellProps {
  addSpells?: SpellFunction;
  openCreateMenu: boolean;
  setOpenCreateMenu: React.Dispatch<React.SetStateAction<boolean>>;
  editSpell: any;
  fetchSpells: () => void;
}

const CreateSpell = ({
  addSpells,
  openCreateMenu,
  setOpenCreateMenu,
  editSpell,
  fetchSpells,
}: createSpellProps) => {
  const closeForm = () => {
    setOpenCreateMenu(!openCreateMenu);
  };
  return (
    <>
      <SpellsForm
        addSpells={addSpells}
        closeForm={closeForm}
        editSpell={editSpell}
        fetchSpells={fetchSpells}
      />
    </>
  );
};

export default CreateSpell;
