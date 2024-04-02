"use client";
import React, { useState } from "react";
import styles from "./TraitsList.module.css";
import Eliminate from "@/components/icons/ui/Eliminate";
import Add from "@/components/icons/ui/Add";
import TraitItem from "./TraitItem";
import CreateTrait from "./CreateTrait";
import { Trait } from "../../Traits";

const TraitsList = ({ traits, removeTrait, addTrait, characterid }: any) => {
  const [openForm, setOpenForm] = useState(false);

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <div>
      <div className={styles.characterTraits}>
        <h3>Rasgos</h3>
        <div className={styles.addBtn} onClick={() => toggleForm()}>
          <Add size={25} color="white" />
        </div>
        {openForm && (
          <div className={styles.createTraitContainer}>
            <CreateTrait
              addTrait={addTrait}
              characterid={characterid}
              toggleForm={toggleForm}
            />
          </div>
        )}
      </div>

      <hr className={styles.hr} />

      <div className={styles.traitsContainer}>
        {traits?.map((trait: Trait, index: number) => (
          <TraitItem removeTrait={removeTrait} key={index} trait={trait} />
        ))}
      </div>
    </div>
  );
};

export default TraitsList;
