import React from "react";
import styles from "./Equipment.module.css";
import ExpandMenu from "./components/ExpandMenu/ExpandMenu";
import Stiletto from "@/components/icons/Stiletto";
import Add from "@/components/icons/ui/Add";

const weapons = [
  {
    title: "Filo Nocturno",
    subtitle: "Daga",
    quantity: 2,
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
  return (
    <section className={styles.equipment}>
      <div className={styles.weight}>
        <strong>Peso: </strong>
        <span>80lb / 150lb</span>
      </div>
      <div className={styles.detailColumns}>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Armas</p>
            <Add className={styles.icon} color="#FFFFFF" size={24} />
          </div>
          <div className={styles.detailCards}>
            {weapons.map((item, index) => (
              <ExpandMenu
                key={item.title + index}
                name={item.title}
                subtitle={item.subtitle}
                equip
                icon={<Stiletto size={40} className={styles.cardIcon} />}
                content={item.content}
              />
            ))}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Armaduras</p>
            <Add className={styles.icon} color="#FFFFFF" size={24} />
          </div>
          <div className={styles.detailCards}>
            {weapons.map((item, index) => (
              <ExpandMenu
                key={item.title + index}
                name={item.title}
                subtitle={item.subtitle}
                equip
                icon={<Stiletto size={40} className={styles.cardIcon} />}
                content={item.content}
              />
            ))}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Objetos</p>
            <Add className={styles.icon} color="#FFFFFF" size={24} />
          </div>
          <div className={styles.detailCards}>
            {weapons.map((item, index) => (
              <ExpandMenu
                key={item.title + index}
                name={item.title}
                subtitle={item.subtitle}
                equip
                icon={<Stiletto size={40} className={styles.cardIcon} />}
                content={item.content}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipment;
