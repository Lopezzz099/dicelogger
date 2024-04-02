import { useRouter } from "next/navigation";

// export type CharacterData = {
//   name: string;
//   age: string;
//   hair: string;
//   eyes: string;
//   skin: string;
//   height: string;
//   weight: string;
//   selectedrace_id: number;
//   selectedAlignment: string;
//   selectedClassId: number;
//   selectedSkills: string[];
//   selectedEquipment: string[];
//   selectedLanguages: string[];
//   selectedBackground: string;
//   description: string;
//   features: string;
//   personality: string;
//   ideals: string;
//   bonds: string;
//   flaws: string;
//   stats: {
//     name: string;
//     label: string;
//     base: number;
//     extra: number;
//   }[];
// };

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
  hitdice: string;
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

export default function useCreateCharacter() {
  const router = useRouter();

  const handleCreateCharacter = ({
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
    hitdice,
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
  }: CharacterData) => {
    console.log(
      JSON.stringify({
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
        class: {class_id},
        background: {background_id},
        story,
        img,
        str,
        dex,
        int,
        con,
        wiz,
        cha,
        hitpoints,
        hitdice,
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
      })
    );
    fetch("/api/characters", {
      method: "POST",
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
        class: {class_id},
        background: {background_id},
        story,
        img,
        str,
        dex,
        int,
        con,
        wiz,
        cha,
        hitpoints,
        hitdice,
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
        // window.localStorage.setItem("user", data.data.username);
        router.push(`/character/${data.characterid}`);
      })
      .catch((err) => console.error(err));
  };

  return handleCreateCharacter;
}
