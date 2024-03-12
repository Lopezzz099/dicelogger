"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import itemsSuscription from "./itemsSuscription";
import Up from "@/components/icons/ui/Up";
import Down from "@/components/icons/ui/Down";

const Suscription = () => {

    const [expandedtexts, setExpandedtexts] = useState<Set<number>>(
        new Set()
    );
    
    const toggleSessions = (index: number) => {
        setExpandedtexts((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    };

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
                {itemsSuscription.map((item, index) => {
                    const isExpanded = expandedtexts.has(index);

                    return (
                        <div key={index}>
                            <div
                                className={styles.accordion}
                                onClick={() => toggleSessions(index)}
                                style={{
                                    borderRadius: "5px",
                                }}
                            >
                                <div>{item.title}</div>
                                <div style={{ display: "flex" }}>
                                    {isExpanded ? <Up size={20} /> : <Down size={20} />}
                                </div>
                            </div>
                            {isExpanded && (
                                <div className={styles.notes}>
                                    <p>{item.text}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Suscription;
