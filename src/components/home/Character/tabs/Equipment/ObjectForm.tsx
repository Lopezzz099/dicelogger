"use client";

import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import React, { FormEvent, useState } from "react";
import Input from "@/components/common/inputs/Input";
import TextArea from "@/components/common/inputs/TextArea";
import styles from "./WeaponForm.module.css";
import Coins from "@/components/icons/Coins";
import IconButton from "@/components/common/buttons/IconButton";
import Cash from "@/components/icons/Cash";
import Left from "@/components/icons/ui/Left";
import Delete from "@/components/icons/ui/Delete";
import Eliminate from "@/components/icons/ui/Eliminate";
import Close from "@/components/icons/ui/Close";

type ObjectFormProps = {
  handleDisplay: (value: string) => void;
}

const ObjectForm = ({ handleDisplay } : ObjectFormProps) => {
  const [goldPieces, setGoldPieces] = useState(false)
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const handleGoldPieces = () => {
    if (goldPieces) {
      setName("")
      setWeight(0)
      setPrice(0)
      setQuantity(1)
      setDescription("")
      setGoldPieces(false)
    } else {
      setName("Piezas de oro")
      setWeight(0)
      setPrice(1)
      setQuantity(1)
      setDescription("Moneda de oro brillante y reluciente, emblema de riqueza y poder. Sirve para comerciar.")
      setGoldPieces(true)
    }
  }

  return (
    <section className={styles.weaponFormSection}>
      <div className={styles.weaponFormTitleBox}>
        <div className={goldPieces ? styles.objectGoldPiecesActive : styles.objectGoldPieces}>
          <h3>{goldPieces ? "Crear piezas de oro" : "Crear objeto"}</h3>
          <IconButton onClick={handleGoldPieces} icon={<Cash />} />
        </div>
        <Button className={styles.weaponFormTitleBoxBtn} onClick={() => handleDisplay("")}>Volver</Button>
        <div className={styles.leftBtn}>
          <IconButton onClick={() => handleDisplay("")} icon={<Close />} primary />
        </div>
      </div>
      <form className={styles.weaponForm} onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="name">Nombre del objeto</label>
          <Input
            type="text"
            name="name"
            placeholder="Escribe aquí..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="weight">
            Peso (kg)
          </label>
          <Input
            type="number"
            name="weight"
            placeholder="Escribe aquí..."
            value={weight.toString()}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="price">
            Precio (piezas de oro)
          </label>
          <Input
            type="number"
            name="price"
            placeholder="Escribe aquí..."
            value={goldPieces ? quantity.toString() : price.toString()}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            disabled={goldPieces}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyles.requiredLabel} htmlFor="quantity">
            cantidad
          </label>
          <Input
            type="number"
            name="quantity"
            placeholder="Escribe aquí..."
            value={quantity.toString()}
            min={1}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup className={styles.descriptionField}>
          <label htmlFor="description">Descripción</label>
          <TextArea
            disableResize
            className={formStyles.textarea}
            name="description"
            placeholder="Escribe aquí..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">
          Crear armadura
        </Button>
      </form>
    </section>
  )
}

export default ObjectForm