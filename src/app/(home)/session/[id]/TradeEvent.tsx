"use client"

import FormGroup from '@/components/home/NewLayout/FormGroup';
import React, { useState } from 'react'
import styles from './TradeEvent.module.css'
import Select from '@/components/common/inputs/Select';
import MultiSelect from '@/components/common/inputs/MultiSelect';
import Button from '@/components/common/buttons/Button';
import formStyles from "@/components/home/NewLayout/Extra.module.css";

const bonuses = ["FUE", "DES", "CON", "INT", "SAB", "CAR"];

const TradeEvent = () => {
  const [target, setTarget] = useState("");
  const [targetItems, setTargetItems] = useState([]);
  const [selectedTargetItems, setSelectedTargetItems] = useState<string[]>([]);
  const [myItems, setMyItems] = useState([]);
  const [mySelectedItems, setMySelectedItems] = useState<string[]>([]);


  return (
    <form className={styles.tradeForm}>
      <FormGroup className={styles.tradeFormGroup}>
        <label htmlFor="target" className={formStyles.requiredLabel}>Comerciar con:</label>
        <Select
          placeholder="Elige un personaje"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          maxHeigth="250px"
          value={target}
          onChange={(value) => setTarget(value)}
          className={styles.tradeFormInput}
        />
      </FormGroup>
      <FormGroup className={styles.tradeFormGroup}>
        <label htmlFor="target" className={formStyles.requiredLabel}>Ofreces</label>
        <MultiSelect
          placeholder="Elige objetos"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          selectedOptions={mySelectedItems}
          maxHeigth="250px"
          onChange={(value) => setMySelectedItems([])}
          className={styles.tradeFormInput}

        />
      </FormGroup>
      <FormGroup className={styles.tradeFormGroup}>
        <label htmlFor="target" className={formStyles.requiredLabel}>Recibes</label>
        <MultiSelect
          placeholder="Elige objetos"
          options={bonuses.map((roll) => ({
            value: roll,
            label: roll,
          }))}
          selectedOptions={selectedTargetItems}
          maxHeigth="250px"
          onChange={(value) => setSelectedTargetItems([])}
          className={styles.tradeFormInput}
        />
      </FormGroup>
      
      <Button>Enviar oferta</Button>
    </form>
  );
}

export default TradeEvent