"use client";

import Button from "@/components/common/buttons/Button";

import Select from "@/components/common/inputs/Select";
import FilterButton from "@/components/home/List/FilterButton";
import React, { useState } from "react";

type FilterSpellFunction = (
  filterType: "type" | "level",
  filterValue: string | number
) => void;

export interface spellFilterProps {
  filterSpells: FilterSpellFunction;
}

const SpellFilter = ({ filterSpells }: spellFilterProps) => {
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleLevel = (value: string) => {
    setSelectedLevel(value);
    filterSpells("level", value);
  };

  const [selectedType, setSelectedType] = useState("");

  const handleType = (value: string) => {
    setSelectedType(value);
    filterSpells("type", value);
  };

  const handleClear = () => {
    setSelectedType("");
    setSelectedLevel("");
  };

  const spellTypes = [
    { value: "Adivinación", label: "Adivinación" },
    { value: "Abjuración", label: "Abjuración" },
    { value: "Conjuración", label: "Conjuración" },
    { value: "Encantamiento", label: "Encantamiento" },
    { value: "Evocación", label: "Evocación" },
    { value: "Ilusión", label: "Ilusiónn" },
    { value: "Nigromancia", label: "Nigromancia" },
    { value: "Transmutación", label: "Transmutación" },
  ];
  const spellsLevels = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  return (
    <FilterButton>
      <Select
        options={spellsLevels}
        onChange={handleLevel}
        value={selectedLevel}
        placeholder="Filtrar por nivel"
        showValue={true}
      />
      <Select
        options={spellTypes}
        onChange={handleType}
        value={selectedType}
        placeholder="Filtrar por tipo"
        showValue={true}
      />

      <Button onClick={handleClear} type="button">
        Borrar filtros
      </Button>
    </FilterButton>
  );
};

export default SpellFilter;
