import React from "react";
import styles from "./TraitItem.module.css";
import { Trait } from "../../Traits";

import Delete from "@/components/icons/ui/Delete";

const TraitItem = ({ trait, removeTrait }: any) => {
  return (
    <div className={styles.trait}>
      <div className={styles.traitInfo}>
        <h4>{trait.name}</h4>
        <p>{trait.description}</p>
      </div>
      <div className={styles.deleteButton} onClick={() => removeTrait(trait)}>
        <Delete size={25} />
      </div>
    </div>
  );
};

export default TraitItem;
