"use client";

import Button from "@/components/common/buttons/Button";
import FormGroup from "@/components/home/NewLayout/FormGroup";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import React, { FormEvent, useState } from "react";
import Input from "@/components/common/inputs/Input";
import TextArea from "@/components/common/inputs/TextArea";
import styles from "./WeaponForm.module.css";
import IconButton from "@/components/common/buttons/IconButton";
import Cash from "@/components/icons/Cash";
import Close from "@/components/icons/ui/Close";
import { ItemReq } from "@/app/api/characters/items/route";

type ObjectFormProps = {
  handleDisplay: (value: string) => void;
  handleItems: (value: any | any[]) => void
  items: any[]
  characterItemId: number | null
  characterId: number
}

const ObjectForm = ({ handleDisplay, handleItems, characterItemId, items, characterId } : ObjectFormProps) => {
  const itemId = characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.item.item_id : 0
  const [goldPieces, setGoldPieces] = useState(characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.item.item_id === 4 : false);
  const [name, setName] = useState(characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.item.name : "");
  const [weight, setWeight] = useState(characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.item.weight : 0);
  const [price, setPrice] = useState(characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.item.price : 0);
  const [description, setDescription] = useState(characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.item.description : "");
  const [quantity, setQuantity] = useState(characterItemId ? items.find((item) => item.character_item_id === characterItemId)?.quantity : 1);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if (characterItemId) {
      await updateItem()
    } else {
      await createItem()
    }
  };

  const createItem = async () => {
    const item: ItemReq = {
      character_data_id: characterId,
      name,
      weight,
      price,
      description,
      quantity
    };

    const response = await fetch("/api/characters/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      const data = await response.json();
      setError(false);
      setIsLoading(false);
      handleItems([...items, data.data]);
      handleDisplay("")
    } else {
      setError(true);
      setIsLoading(false);
    }
  }

  const updateItem = async () => {
    const item: ItemReq = {
      name,
      weight,
      price,
      description,
      quantity,
      character_item_id: characterItemId,
      character_data_id: characterId
    };

    const response = await fetch("/api/characters/items/" + itemId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      const data = await response.json();
      setError(false);
      setIsLoading(false);
      const newItems = [...items];
      const updatedItem = newItems.findIndex((item) => item.character_item_id === characterItemId);
      newItems[updatedItem] = data.data;
      handleItems(newItems);
      handleDisplay("")
    } else {
      setError(true);
      setIsLoading(false);
    }
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
      setName("Pieza de oro")
      setWeight(0)
      setPrice(1)
      setQuantity(1)
      setDescription("Una pieza de oro es una moneda circular valiosa utilizada para comprar bienes, servicios y recompensas en aventuras, representando riqueza y poder")
      setGoldPieces(true)
    }
  }

  return (
    <section className={styles.weaponFormSection}>
      <div className={styles.weaponFormTitleBox}>
        <div className={goldPieces ? styles.objectGoldPiecesActive : styles.objectGoldPieces}>
          <h3>{itemId ? itemId !== 4 ? "Editar objeto" : "Editar piezas de oro" : goldPieces ? "Crear piezas de oro" : "Crear objeto"}</h3>
          {
            !itemId && <IconButton onClick={handleGoldPieces} icon={<Cash />} />
          }
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
            disabled={goldPieces}
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
            disabled={goldPieces}
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
            value={price.toString()}
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
            disabled={goldPieces}
          />
        </FormGroup>
        {error && (
          <p className={styles.errorMessage}>
            Halgo salío mal. Intenta de nuevo en otro momento.
          </p>
        )}
        <Button type="submit">
          {isLoading ? "Cargando..." : itemId ? itemId !== 4 ? "Editar objeto" : "Editar piezas de oro" : goldPieces ? "Crear piezas de oro" : "Crear objeto"}
        </Button>
      </form>
    </section>
  )
}

export default ObjectForm