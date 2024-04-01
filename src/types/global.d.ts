type Friend = {
  id: string;
  avatar: string;
  displayname: string;
  username: string;
  following: boolean;
  followsYou: boolean;
}

type Tab = {
  name: string;
  label: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
}

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean
}

type ButtonLinkCreateProps = {
  children: React.ReactNode;
  link: string;
  storage: string;
}

type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  subExpiration: string;
  subscribed?: boolean;
}

export type FullCharacter = {
  characterid: number
  userid: string
  campaignid: number
  race: Race
  class: Class
  background: Background
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
  items: CharacterItem[]
  weapons: CharacterWeapon[]
  armor: CharacterArmor[]
  skills: Skill[]
  features: Feature[]
  spells: Spell[]
  proficiencies: any[]
}

export type Race = {
  race_id: number
  name: string
  description: string
  speed: number
  str: number
  dex: number
  int: number
  con: number
  wiz: number
  cha: number
}

export type Class = {
  class_id: number
  name: string
  description: string
  proficiency_bonus: number
  hit_dice: string
  armor_proficiencies: string
  weapon_proficiencies: string
  tool_proficiencies: string
  spellcasting_ability: string
}

export type Background = {
  background_id: number
  name: string
  languages: string
  personality_traits: string
  ideals: string
  bond: string
  flaws: string
  trait: string
  tool_proficiencies: string
}

export type CharacterItem = {
  character_item_id: number
  character_data_id: number
  item: Item
  quantity: number
}

export type Item = {
  item_id: number
  name: string
  weight: number
  price: number
  description: string
  campaign_id: number
}

export type CharacterWeapon = {
  character_weapon_id: number
  character_data_id: number
  weapon: Weapon
  equipped: boolean
}

export type Weapon = {
  weapon_id: number
  weapon_type: string
  name: string
  weight: number
  price: number
  category: string
  reach: string
  description: string
  damage: string
  veratile_damage: string
  ammunition: number
  damage_type: string
  campaign_id: number
}

export type CharacterArmor = {
  armorxcharacter_data_id: number
  armor: Armor
  character_data_id: number
  equipped: boolean
}

export type Armor = {
  armor_id: number
  material: string
  name: string
  weight: number
  price: number
  category: string
  protection_type: string
  description: string
  penalty: string
  strength: number
  armor_class: number
  dex_bonus: string
  campaign_id?: number
}

export type Skill = {
  skill_id: number
  name: string
  stat: string
}

export type Feature = {
  feature_id: number
  name: string
  description: string
}

export type Spell = {
  spell_id: number
  name: string
  description: string
  range: number
  ritual: boolean
  duration: string
  concentration: boolean
  casting_time: string
  level: number
  damage_type: string
  difficulty_class: number
  aoe: number
  school: string
}

export type Session = {
  session_id: number
  start: string
  end: string
  description: string
  campaign_id: number
  current_enviroment: any
}

export type ShortCharacter = {
  character_id: number
  user_id: string
  campaign_id: number
  image_url: string
  name: string
  race: string
  class: string
  level: number
  hit_points: number
}