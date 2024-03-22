"use client";

import React, { useState } from "react";
import styles from "./Equipment.module.css";
import ExpandMenu from "./components/ExpandMenu/ExpandMenu";
import Stiletto from "@/components/icons/Stiletto";
import Add from "@/components/icons/ui/Add";
import Breastplate from "@/components/icons/Breastplate";
import SwapBag from "@/components/icons/SwapBag";
import { useRouter } from "next/navigation";
import MainEquipment from "./Equipment/MainEquipment";
import WeaponForm from "./Equipment/WeaponForm";
import ArmorForm from "./Equipment/ArmorForm";
import ObjectForm from "./Equipment/ObjectForm";

const weapons = [
  {
    title: "Filo Nocturno",
    subtitle: "Daga",
    content: {
      Categoría: "armac c/c simples",
      Alcance: "20/60",
      Precio: "2 piezas de oro",
      Peso: "1kg",
      Daño: "1d4",
      "Daño crítico": "2d4",
      "Daño versátil": "1d8",
      Propiedades: "arrojadiza, ligera, sutil",
      Descripción:
        "daga elegante y letal, hoja oscura con línea de plata, ideal para combate furtivo y potencia habilidades sigilosas con aura mágica de sombras.",
    },
  },
  {
    title: "Viento Veloz",
    subtitle: "Honda",
    content: {
      Categoría: "arma a distancia simple",
      Alcance: "60/90",
      Precio: "1 pieza de oro",
      Peso: "1kg",
      Daño: "1d4",
      "Daño crítico": "2d4",
      "Daño versátil": "1d8",
      Propiedades: "arrojadiza, ligera, sutil",
      Descripción:
        "daga elegante y letal, hoja oscura con línea de plata, ideal para combate furtivo y potencia habilidades sigilosas con aura mágica de sombras.",
    },
  },
  {
    title: "Filo Nocturno",
    subtitle: "Daga",
    content: {
      Categoría: "armac c/c simples",
      Alcance: "20/60",
      Precio: "2 piezas de oro",
      Peso: "1lb",
      Daño: "1d4",
      "Daño crítico": "2d4",
      "Daño versátil": "1d8",
      Propiedades: "arrojadiza, ligera, sutil",
      Descripción:
        "daga elegante y letal, hoja oscura con línea de plata, ideal para combate furtivo y potencia habilidades sigilosas con aura mágica de sombras.",
    },
  },
];

const Equipment = () => {
  const [display, setDisplay] = useState("");

  function handleDisplay(value: string) {
    setDisplay(value);
  }

  function displayFunction() {
    switch (display) {
      case "weapon":
        return <WeaponForm handleDisplay={handleDisplay} />;
      case "armor":
        return <ArmorForm handleDisplay={handleDisplay} />;
      case "object":
        return <ObjectForm handleDisplay={handleDisplay} />;
      default:
        return (
          <MainEquipment weapons={weapons} handleDisplay={handleDisplay} />
        );
    }
  }

  return <section className={styles.equipment}>{displayFunction()}</section>;
};

export default Equipment;
