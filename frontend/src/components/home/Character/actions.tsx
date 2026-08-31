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

export const editCharacter = async (
  id: number,
  {
    user_id,
    campaign_id,
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    race_id,
    alignment,
    class_id,
    background_id,
    story,
    img,
    str,
    dex,
    int,
    con,
    wiz,
    cha,
    hitpoints,
    hit_dice,
    speed,
    armorclass,
    level,
    exp,
    items,
    weapons,
    armor,
    skills,
    features,
    spells,
    proficiencies,
  }: CharacterData
) => {
  fetch(`${process.env.URL}/api/characters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      campaign_id,
      name,
      age,
      hair,
      eyes,
      skin,
      height,
      weight,
      race: { race_id },
      alignment,
      class: { class_id },
      background: { background_id },
      story,
      img,
      str,
      dex,
      int,
      con,
      wiz,
      cha,
      hitpoints,
      hit_dice,
      speed,
      armorclass,
      level,
      exp,
      items,
      weapons,
      armor,
      skills,
      features,
      spells,
      proficiencies,
    }),
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
      // redirect(`/characters`);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const doubleUpCharacter = async (
  id: number,
  {
    user_id,
    campaign_id,
    name,
    age,
    hair,
    eyes,
    skin,
    height,
    weight,
    race_id,
    alignment,
    class_id,
    background_id,
    story,
    img,
    str,
    dex,
    int,
    con,
    wiz,
    cha,
    hitpoints,
    hit_dice,
    speed,
    armorclass,
    level,
    exp,
    items,
    weapons,
    armor,
    skills,
    features,
    spells,
    proficiencies,
  }: CharacterData
) => {
  fetch(`${process.env.URL}/api/characters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      campaign_id,
      name,
      age,
      hair,
      eyes,
      skin,
      height,
      weight,
      race: { race_id },
      alignment,
      class: { class_id },
      background: { background_id },
      story,
      img,
      str,
      dex,
      int,
      con,
      wiz,
      cha,
      hitpoints,
      hit_dice,
      speed,
      armorclass,
      level,
      exp,
      items,
      weapons,
      armor,
      skills,
      features,
      spells,
      proficiencies,
    }),
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
      // redirect(`/characters`);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
