"use client";

import React from "react";
import styles from "./page.module.css";
import itemsSuscription from "./itemsSuscription";
import BoxSuscription from "@/components/home/BoxSuscription/BoxSuscription";

const Suscription = () => {
    return (
        <section className={styles.list}>
            <section className={styles.header}>
                <div className={styles.title}>
                    <h2>Suscripción</h2>
                </div>
            </section>
            <hr />
            
            <div className={styles.titleMain}>
                <h4>Preguntas frecuentes</h4>
            </div>
                <div className={styles.items}>
                    {itemsSuscription.map((object, index) => (
                        <BoxSuscription
                            key={index}
                            title={object.title}
                            text={object.text}
                        />
                    ))}
                </div>
        </section>
    );
};

export default Suscription;
