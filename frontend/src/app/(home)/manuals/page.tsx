"use client";

import React from "react";
import styles from "./page.module.css";
import itemsManuals from "./itemsManuals";
import BoxManual from "@/components/home/BoxManual/BoxManual";

const Manuals = () => {
  return (
    <section className={styles.list}>
      <section className={styles.header}>
        <div className={styles.title}>
          <h2>Manuales</h2>
        </div>
      </section>
      <hr />
      <div className={styles.items}>
      {itemsManuals.map((object, index) => (
        <BoxManual
          key={index}
          icon={object.icon}
          title={object.title}
          link={object.link}
        />
      ))}
      </div>
    </section>
  );
};

export default Manuals;
