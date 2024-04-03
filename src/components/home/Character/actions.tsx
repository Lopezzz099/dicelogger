"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const session = cookies().get("Session")?.value;

export const removeCharacter = async (characterId: number) => {
  try {
    const response = await fetch(
      `${process.env.URL}/api/characters/${characterId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `Session=${session}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    revalidatePath("/characters");
  } catch (error: any) {
    console.error(error);
  }
};

export type CharacterData = {
  user_id: string;
  campaign_id: number;
  race_id: number;
  class_id: number;
  background_id: number;
  name: string;
  story: string;
  alignment: string;
  age: number;
  hair: string;
  eyes: string;
  skin: string;
  height: number;
  weight: number;
  img: string;
  str: number;
  dex: number;
  int: number;
  con: number;
  wiz: number;
  cha: number;
  hitpoints: number;
  hit_dice: string;
  speed: number;
  armorclass: number;
  level: number;
  exp: number;
  items: null | any[];
  weapons: null | any[];
  armor: null | any[];
  skills: null | any[];
  features: null | any[];
  spells: null | any[];
  proficiencies: null | any[];
};

export const editCharacter = async (id: number, body: CharacterData) => {
  console.log(body)
  fetch(`${process.env.URL}/api/characters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      revalidatePath(`/character/${id}/edit`);
      revalidatePath(`/characters`);
      revalidatePath(`/character/${id}`);
      redirect(`/characters`);
    })
    .catch((err) => console.error(err));
};
