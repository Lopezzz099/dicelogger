import styles from "./Character.module.css";
import CharacterHeader from "./CharacterHeader";
import CharacterTabs from "./CharacterTabs";

export interface Character {
  characterid: number;
  userid: number | null;
  campaignid: number;
  race: {
    race_id: number;
    name: string;
    description: string;
    speed: number;
    str: number;
    dex: number;
    int: number;
    con: number;
    wiz: number;
    cha: number;
  };
  class: {
    class_id: number;
    name: string;
    description: string;
    proficiency_bonus: number;
    hit_dice: string;
    armor_proficiencies: string;
    weapon_proficiencies: string;
    tool_proficiencies: string;
    spellcasting_ability: string;
  };
  background: {
    background_id: number;
    name: string;
    languages: string;
    personality_traits: string;
    ideals: string;
    bond: string;
    flaws: string;
    trait: string;
    tool_proficiencies: string;
  };
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
  items: { [key: string]: any }[];
  weapons: any[];
  armor: any[];
  skills: any[];
  features: any[];
  spells: { [key: string]: any }[];
  proficiencies: any[];
}

export interface CharacterProps {
  characterData: Character;
}

const Character: React.FC<CharacterProps> = ({ characterData }) => {
  // console.log(characterData);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CharacterHeader characterData={characterData as any}/>
        <CharacterTabs characterData={characterData as any}/>
      </div>
    </div>
  );
};

export default Character;
