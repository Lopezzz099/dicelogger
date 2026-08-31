"use client";

import Breastplate from "@/components/icons/Breastplate";
import React, { useState } from "react";
import styles from "./MainEquipment.module.css";
import ExpandMenu from "../components/ExpandMenu/ExpandMenu";
import SwapBag from "@/components/icons/SwapBag";
import Add from "@/components/icons/ui/Add";
import Stiletto from "@/components/icons/Stiletto";
import { EquipmentProps } from "../Equipment";

type MainEquipmentProps = {
  equipment: EquipmentProps;
  handleDisplay: (value: string, id?: number) => void;
  handleWeapons: (value: any | any[]) => void;
  handleArmors: (value: any | any[]) => void;
  handleItems: (value: any | any[]) => void;
};

const getWeight = (equipment: EquipmentProps) => {
  const weaponsWeight = equipment.weapons.reduce(
    (accumulator, currentValue) => accumulator + currentValue.weapon.weight,
    0
  );
  const armorsWeight = equipment.armors.reduce(
    (accumulator, currentValue) => accumulator + currentValue.armor.weight,
    0
  );
  const itemsWeight = equipment.items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.item.weight,
    0
  );
  return weaponsWeight + armorsWeight + itemsWeight;
};

const MainEquipment = ({
  equipment,
  handleDisplay,
  handleWeapons,
  handleArmors,
  handleItems
}: MainEquipmentProps) => {
  const weight = getWeight(equipment);

  const deleteWeapon = async (characterWeaponId: number) => {
    const response = await fetch(
      `/api/characters/weapons/${characterWeaponId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log(characterWeaponId);
      handleWeapons(
        equipment.weapons.filter(
          (weapon) => weapon.character_weapon_id !== characterWeaponId
        )
      );
    }
  };

  const deleteArmor = async (characterArmorId: number) => {
    const response = await fetch(`/api/characters/armors/${characterArmorId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleArmors(
        equipment.armors.filter(
          (armor) => armor.character_armor_id !== characterArmorId
        )
      );
    }
  };

  const deleteItem = async (characterItemId: number) => {
    const response = await fetch(`/api/characters/items/${characterItemId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleItems(
        equipment.items.filter(
          (item) => item.character_item_id !== characterItemId
        )
      );
    }
  };

  return (
    <>
      <div className={styles.weight}>
        <strong onClick={() => console.log(equipment)}>Peso: </strong>
        <span
          style={{
            color: weight > equipment.maxWeight ? "#e61720" : "inherit",
          }}
        >
          {weight}kg / {equipment.maxWeight}kg
        </span>
      </div>
      <div className={styles.detailColumns}>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Armas</p>
            <button
              className={styles.titleBoxBtn}
              onClick={() => handleDisplay("weapon")}
            >
              <Add className={styles.icon} color="#FFFFFF" size={24} />
            </button>
          </div>
          <div className={styles.detailCards}>
            {equipment.weapons.map((weapon) => (
              <ExpandMenu
                key={weapon.character_weapon_id}
                onDelete={() => {
                  deleteWeapon(weapon.character_weapon_id);
                }}
                onEdit={() => {
                  handleDisplay("weapon", weapon.weapon.weapon_id);
                }}
                equip={true}
                isEquipped={weapon.equipped}
                name={weapon.weapon.name}
                subtitle={weapon.weapon.weapon_type}
                icon={<Stiletto size={40} className={styles.cardIcon} />}
                content={{
                  Categoría: weapon.weapon.category,
                  Alcance: weapon.weapon.reach,
                  "Tipo de daño": weapon.weapon.damage_type,
                  Precio: weapon.weapon.price + " piezas de oro",
                  Peso: weapon.weapon.weight + "kg",
                  Daño: weapon.weapon.damage,
                  "Daño versátil": weapon.weapon.veratile_damage,
                  Descripción: weapon.weapon.description,
                  Munición: weapon.weapon.ammunition || "",
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Armaduras</p>
            <button
              className={styles.titleBoxBtn}
              onClick={() => handleDisplay("armor")}
            >
              <Add className={styles.icon} color="#FFFFFF" size={24} />
            </button>
          </div>
          <div className={styles.detailCards}>
            {equipment.armors.map((armor) => (
              <ExpandMenu
                key={armor.armorxcharacter_data_id}
                onDelete={() => {
                  deleteArmor(armor.armorxcharacter_data_id);
                }}
                onEdit={() => {
                  handleDisplay("armor", armor.armor.armor_id);
                }}
                equip={true}
                name={armor.armor.name}
                subtitle={armor.armor.category}
                icon={<Breastplate size={40} className={styles.cardIcon} />}
                isEquipped={armor.equipped}
                content={{
                  Material: armor.armor.material,
                  "Clase de armadura": armor.armor.armor_class,
                  "Bonificador de destreza": armor.armor.dex_bonus,
                  Precio: armor.armor.price + " piezas de oro",
                  Peso: armor.armor.weight + "kg",
                  Fuerza: armor.armor.strength,
                  Penalización: armor.armor.penalty,
                  "Tipo de protección": armor.armor.protecion_type,
                  Descripción: armor.armor.description,
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Objetos</p>
            <button
              className={styles.titleBoxBtn}
              onClick={() => handleDisplay("object")}
            >
              <Add className={styles.icon} color="#FFFFFF" size={24} />
            </button>
          </div>
          <div className={styles.detailCards}>
            {equipment.items.map((item) => (
              <ExpandMenu
                key={item.character_item_id}
                onDelete={() => { deleteItem(item.character_item_id) }}
                onEdit={() => { handleDisplay("object", item.character_item_id) }}
                name={item.item.name}
                subtitle={"Cant. " + item.quantity}
                equip={false}
                icon={<SwapBag size={40} className={styles.cardIcon} />}
                content={{
                  Precio: item.item.price + " piezas de oro",
                  Peso: item.item.weight + "kg",
                  Descripción: item.item.description,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainEquipment;
