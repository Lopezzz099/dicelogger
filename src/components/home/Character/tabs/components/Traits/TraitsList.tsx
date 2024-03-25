"use client";
import React, { useState } from "react";
import styles from "./TraitsList.module.css";
import Eliminate from "@/components/icons/ui/Eliminate";
import Add from "@/components/icons/ui/Add";
import TraitItem from "./TraitItem";
import CreateTrait from "./CreateTrait";

const TraitsList = ({ traits }: any) => {
  const [openForms, setOpenForms] = useState(Array(traits.length).fill(false));

  const toggleForm = (index: number) => {
    const updatedForms = [...openForms];
    updatedForms[index] = !updatedForms[index];
    setOpenForms(updatedForms);
  };

  return (
    <div>
      {traits.map((trait: any, index: number) => (
        <div key={index} className={styles.characterTraits}>
          <div className={styles.heading}>
            <div className={styles.headingContent}>
              <h3>
                {trait.title}
                {trait.subtitle && ":"}
              </h3>
              <p>{trait.subtitle}</p>
            </div>

            <div className={styles.addBtn} onClick={() => toggleForm(index)}>
              <Add size={25} color="white" />
            </div>
          </div>

          <hr />
          {openForms[index] && (
            <div className={styles.createTraitContainer}>
              <CreateTrait />
            </div>
          )}

          <div className={styles.traitsContainer}>
            {trait.characterTraits.map((trait: any, index: number) => (
              <TraitItem name={trait.name} description={trait.description} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TraitsList;
