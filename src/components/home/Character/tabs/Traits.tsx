"use client";

import React, { useEffect, useState } from "react";
import TraitsList from "./components/Traits/TraitsList";

export interface Trait {
  feature_id: number;
  name: string;
  description: string;
}

export interface CharacterFeatures {
  character_id: number;
  feature_id: number;
}

interface TraitsProps {
  characterid: number;
}

// const traits: Trait[] = [
//   {
//     name: "Lanzamiento de conjuros",
//     description:
//       "Puedes usar tu inteligencia para lanzar conjuros arcanos. Posees un libro de conjuros el cual recopila todos los conjuros que conoces. Puedes preparar una cantidad de conjuros menor o igual a tu modificador de inteligencia + tu nivel de mago. Para lanzar un conjuro debes gastar un espacio de conjuros.",
//   },
//   {
//     name: "Lanzamiento ritual",
//     description:
//       "Puedes lanzar un conjuro de mago como un ritual si el conjuro tiene el descriptor ritual y lo tienes en tu libro de conjuros. No necesitas tenerlo preparado.",
//   },
//   {
//     name: "Recuperación arcana",
//     description:
//       "Has aprendido a recuperar parte de tus energías mágicas gracias al estudio de tu libro de conjuros. Una vez por día, cuando finalizas un descanso corto, puedes elegir qué espacios de conjuros quieres recuperar. Los espacios de conjuros pueden tener un nivel combinado igual a la mitad de tu nivel de mago (redondeando hacia arriba), aunque ninguno de los espacios de conjuros puede ser de nivel 6 o superior.",
//   },
// ];

const initialTraits: Trait[] = [];

const Traits = ({ characterid }: TraitsProps) => {
  const [features, setFeatures] = useState<Trait[]>(initialTraits);
  const getFeatures = async (): Promise<CharacterFeatures[]> => {
    try {
      const response = await fetch(`/api/characterFeature/${characterid}`);
      const responseData = await response.json();

      return responseData;
    } catch (error: any) {
      console.error("Error fetching spells:", error.message);
      return [];
    }
  };

  const getFeatureById = async (id: number): Promise<Trait[]> => {
    try {
      const response = await fetch(`/api/feature/${id}`);
      const responseData = await response.json();

      return responseData.features;
    } catch (error: any) {
      console.error("Error fetching spells:", error.message);
      return [];
    }
  };

  const fetchFeatures = async () => {
    try {
      const characterFeaturesData: Trait[] = await getFeatureById(characterid);
      setFeatures(characterFeaturesData);
      console.log(characterFeaturesData);
    } catch (error: any) {
      console.error("Error fetching features:", error.message);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const addTrait = async (trait: any) => {
    try {
      const body = {
        character_id: trait.character_id,
        name: trait.name,
        description: trait.description,
      };

      const response = await fetch("/api/feature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response && response.status === 200) {
        fetchFeatures();
      } else {
        throw new Error("Failed to add feature");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeTrait = async (traitToRemove: Trait) => {
    try {
      const response = await fetch(
        `/api/characterFeature/${traitToRemove.feature_id}/${characterid}`,
        {
          method: "DELETE",
        }
      );

      if (response && response.status === 200) {
        fetchFeatures();
      } else {
        throw new Error("Failed to remove trait");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TraitsList
      traits={features}
      removeTrait={removeTrait}
      addTrait={addTrait}
      characterid={characterid}
    />
  );
};

export default Traits;
