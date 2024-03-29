import React from "react";
import styles from "./TraitItem.module.css";
import { Trait, TraitGroup } from "../../Traits";

import Delete from "@/components/icons/ui/Delete";

const TraitItem = ({ name, description }: Trait) => {
  return (
    <div className={styles.trait}>
      <div className={styles.traitInfo}>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div className={styles.deleteButton}>
        <Delete size={25} />
      </div>
    </div>
  );
};

export default TraitItem;
