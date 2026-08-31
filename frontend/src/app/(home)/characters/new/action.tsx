import { getIsUserSubscribed } from "@/services/getIsSubscribed";
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers";
import { getCharactersTemplates } from "../templates/page";

export const getRaces = async () => {
  const data = {
    races: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/races");
    data.races = await response.json();
    data.info = "Success";
    revalidatePath('/characters/new')
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};

export const getClasess = async () => {
  const data = {
    clasess: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/clasess");
    data.clasess = await response.json();
    data.info = "Success";
    revalidatePath('/characters/new')
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};

export const getBackgrounds = async () => {
  const data = {
    backgrounds: [],
    info: "",
  };
  try {
    const response = await fetch(process.env.URL + "/api/backgrounds");
    data.backgrounds = await response.json();
    data.info = "Success";
    revalidatePath('/characters/new')
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
};

export type CharacterTemplate = {
  character_id: number
  race_id: number
  class_id: number
  background_id: number
  name: string
  story: string
  alignment: string
  age: number
  hair: string
  eyes: string
  skin: string
  height: number
  weight: number
  img: string
  str: number
  dex: number
  int: number
  con: number
  wiz: number
  cha: number
  hitpoints: number
  hitdice: string
  speed: number
  armorclass: number
  level: number
  exp: number
  items: any[]
  weapons: any[]
  armor: any
  skills: any[]
  features: any[]
  spells: any[]
  proficiencies: any[]
  pro: boolean
}

export const getCharacterTemplate = async (userId?: string, templateId?: string) => {
  if (!templateId || !userId) {
    console.log(templateId, userId);
    return null;
  }
  const data = await getCharactersTemplates();
  const characters: CharacterTemplate[] = data.charactersTemplates
  const characterTemplate = characters.find(
    (c) => c.character_id === parseInt(templateId)
  );
  if (!characterTemplate) return null;

  if (characterTemplate.pro) {
    try {
      const res = await getIsUserSubscribed(cookies);
      if (res) {
        return characterTemplate;
      } else {
        return false
      }
    } catch (error) {
      return null;
    }
  }

  return characterTemplate;
};