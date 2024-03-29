"use client";

import React, { useState } from "react";
import styles from "./Equipment.module.css";
import MainEquipment from "./Equipment/MainEquipment";
import WeaponForm from "./Equipment/WeaponForm";
import ArmorForm from "./Equipment/ArmorForm";
import ObjectForm from "./Equipment/ObjectForm";

export type EquipmentProps = {
  items: any[];
  weapons: any[];
  armors: any[];
  maxWeight: number;
};

const Equipment = ({
  items,
  weapons,
  armors,
  maxWeight,
  characterId,
}: EquipmentProps & { characterId: number }) => {
  const [display, setDisplay] = useState<{ value: string; id: number | null }>({
    value: "",
    id: null,
  });
  const [weaponsData, setWeaponsData] = useState(weapons || []);
  const [armorsData, setArmorsData] = useState(armors || []);
  const [itemsData, setItemsData] = useState(items || []);

  const handleWeaponsData = (value: any | any[]) => {
    setWeaponsData(value);
  };

  const handleArmorsData = (value: any | any[]) => {
    setArmorsData(value);
  };

  const handleItemsData = (value: any | any[]) => {
    setItemsData(value);
  };

  function handleDisplay(value: string, id?: number) {
    setDisplay({ value, id: id || null });
  }

  function displayFunction() {
    switch (display.value) {
      case "weapon":
        return (
          <WeaponForm
            handleDisplay={handleDisplay}
            characterId={characterId}
            handleWeapons={handleWeaponsData}
            weapons={weaponsData}
            weaponId={display.id}
          />
        );
      case "armor":
        return (
          <ArmorForm
            handleDisplay={handleDisplay}
            characterId={characterId}
            handleArmors={handleArmorsData}
            armors={armorsData}
            armorId={display.id}
          />
        );
      case "object":
        return (
          <ObjectForm
            handleDisplay={handleDisplay}
            characterId={characterId}
            handleItems={handleItemsData}
            items={itemsData}
            characterItemId={display.id}
          />
        );
      default:
        return (
          <MainEquipment
            equipment={{
              weapons: weaponsData,
              armors: armorsData,
              items: itemsData,
              maxWeight,
            }}
            handleDisplay={handleDisplay}
            handleWeapons={handleWeaponsData}
            handleArmors={handleArmorsData}
            handleItems={handleItemsData}
          />
        );
    }
  }

  return <section className={styles.equipment}>{displayFunction()}</section>;
};

export default Equipment;
