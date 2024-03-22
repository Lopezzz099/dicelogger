import Breastplate from "@/components/icons/Breastplate";
import React from "react";
import styles from "./MainEquipment.module.css";
import ExpandMenu from "../components/ExpandMenu/ExpandMenu";
import SwapBag from "@/components/icons/SwapBag";
import Add from "@/components/icons/ui/Add";
import Stiletto from "@/components/icons/Stiletto";

type MainEquipmentProps = {
  weapons: any[];
  handleDisplay: (value: string) => void;
}

const MainEquipment = ({ weapons, handleDisplay } : MainEquipmentProps) => {
  const weight = 80;
  const maxWeight = 150;

  return (
    <>
      <div className={styles.weight}>
        <strong>Peso: </strong>
        <span style={{ color: weight > maxWeight ? "#e61720" : "inherit" }}>
          {weight}kg / {maxWeight}kg
        </span>
      </div>
      <div className={styles.detailColumns}>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Armas</p>
            <button className={styles.titleBoxBtn} onClick={() => handleDisplay("weapon")}>
              <Add className={styles.icon} color="#FFFFFF" size={24} />
            </button>
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
            <button className={styles.titleBoxBtn} onClick={() => handleDisplay("armor")}>
              <Add className={styles.icon} color="#FFFFFF" size={24} />
            </button>
          </div>
          <div className={styles.detailCards}>
            {weapons.map((item, index) => (
              <ExpandMenu
                key={item.title + index}
                name={item.title}
                subtitle={item.subtitle}
                equip
                icon={<Breastplate size={40} className={styles.cardIcon} />}
                content={item.content}
              />
            ))}
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Objetos</p>
            <button className={styles.titleBoxBtn} onClick={() => handleDisplay("object")}>
              <Add className={styles.icon} color="#FFFFFF" size={24} />
            </button>
          </div>
          <div className={styles.detailCards}>
            {weapons.map((item, index) => (
              <ExpandMenu
                key={item.title + index}
                name={item.title}
                subtitle={item.subtitle}
                equip
                icon={<SwapBag size={40} className={styles.cardIcon} />}
                content={item.content}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainEquipment;
