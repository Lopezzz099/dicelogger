import { revalidatePath } from "next/cache"

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
