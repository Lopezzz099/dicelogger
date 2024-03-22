import Barbarian from "@/components/icons/classes/Barbarian"
import Bard from "@/components/icons/classes/Bard"
import Cleric from "@/components/icons/classes/Cleric"
import Druid from "@/components/icons/classes/Druid"
import Fighter from "@/components/icons/classes/Fighter"
import Monk from "@/components/icons/classes/Monk"
import Paladin from "@/components/icons/classes/Paladin"
import Ranger from "@/components/icons/classes/Ranger"
import Rogue from "@/components/icons/classes/Rogue"
import Sorcerer from "@/components/icons/classes/Sorcerer"
import Warlock from "@/components/icons/classes/Warlock"
import Wizard from "@/components/icons/classes/Wizard"
import Dragonborn from "@/components/icons/races/Dragonborn"
import Dwarf from "@/components/icons/races/Dwarf"
import Elf from "@/components/icons/races/Elf"
import Gnome from "@/components/icons/races/Gnome"
import HalfElf from "@/components/icons/races/HalfElf"
import HalfOrc from "@/components/icons/races/HalfOrc"
import Halfling from "@/components/icons/races/Halfling"
import Human from "@/components/icons/races/Human"
import Tiefling from "@/components/icons/races/Tiefling"


export const races = [
  {value: 'human', label: 'Humano', icon: <Human />},
  {value: 'elf', label: 'Elfo', icon: <Elf />},
  {value: 'halfling', label: 'Mediano', icon: <Halfling />},
  {value: 'dwarf', label: 'Enano', icon: <Dwarf />},
  {value: 'gnome', label: 'Gnomo', icon: <Gnome />},
  {value: 'halforc', label: 'Medio-orco', icon: <HalfOrc />},
  {value: 'halfelf', label: 'Medio-elfo', icon: <HalfElf />},
  {value: 'tiefling', label: 'Tiefling', icon: <Tiefling />},
  {value: 'Dragonborn', label: 'Dracónido', icon: <Dragonborn />},

]

export const classes: any = {
  barbarian: { value: 'barbarian', label: 'Bárbaro', icon: <Barbarian /> },
  bard: { value: 'bard', label: 'Bardo', icon: <Bard />},
  cleric: { value: 'cleric', label: 'Clérigo', icon: <Cleric /> },
  druid: { value: 'druid', label: 'Druida', icon: <Druid /> },
  fighter: { value: 'fighter', label: 'Guerrero', icon: <Fighter />},
  monk: { value: 'monk', label: 'Monje', icon: <Monk />},
  paladin: { value: 'paladin', label: 'Paladín', icon: <Paladin />},
  ranger: { value: 'ranger', label: 'Explorador', icon: <Ranger />},
  rogue: { value: 'rogue', label: 'Pícaro', icon: <Rogue />},
  sorcerer: { value: 'sorcerer', label: 'Hechicero', icon: <Sorcerer />},
  warlock: { value: 'warlock', label: 'Brujo', icon: <Warlock />},
  wizard: { value: 'wizard', label: 'Mago', icon: <Wizard />},
}

export const classesArray = Object.keys(classes).map(key => classes[key])

export const alignments = [
  {value: 'lawful-good', label: 'Legal bueno'},
  {value: 'neutral-good', label: 'Neutral bueno'},
  {value: 'chaotic-good', label: 'Caótico bueno'},
  {value: 'lawful-neutral', label: 'Legal neutral'},
  {value: 'true-neutral', label: 'Verdadero neutral'},
  {value: 'chaotic-neutral', label: 'Caótico neutral'},
  {value: 'lawful-evil', label: 'Legal malvado'},
  {value: 'neutral-evil', label: 'Neutral malvado'},
  {value: 'chaotic-evil', label: 'Caótico malvado'},
]

export const skillCompetencies = [ 
  {value: 'atlethism', label: 'Atletismo'},
  {value: 'investigation', label: 'Investigación'},
  {value: 'nature', label: 'Naturaleza'},
  {value: 'perception', label: 'Percepción'},
  {value: 'insight', label: 'Perspicacia'},
  {value: 'stealth', label: 'Sigilo'},
  {value: 'survival', label: 'Supervivencia'},
  {value: 'animal-handling', label: 'Trato con Animales'},
  {value: 'acrobatics', label: 'Acrobacias'},
  {value: 'deception', label: 'Engaño'},
  {value: 'intimidation', label: 'Intimidación'},
  {value: 'performance', label: 'Actuación'},
  {value: 'persuasion', label: 'Persuasión'},
]

export const equipmentCompetencies = [
  {value: 'light-armor', label: 'Armadura ligera'},
  {value: 'medium-armor', label: 'Armadura media'},
  {value: 'heavy-armor', label: 'Armadura pesada'},
  {value: 'shields', label: 'Escudos'},
  {value: 'simple-weapons', label: 'Armas simples'},
  {value: 'martial-weapons', label: 'Armas marciales'},
  {value: 'crossbows', label: 'Ballestas'},
  {value: 'longbows', label: 'Arcos largos'},
  {value: 'shortbows', label: 'Arcos cortos'},
  {value: 'daggers', label: 'Dagas'},
  {value: 'swords', label: 'Espadas'},
  {value: 'maces', label: 'Mazas'},
  {value: 'hammers', label: 'Martillos'},
]

export const backgrounds = [
  {value: 'acolyte', label: 'Acolito'},
  {value: 'charlatan', label: 'Charlatán'},
  {value: 'criminal', label: 'Criminal'},
  {value: 'entertainer', label: 'Artista'},
  {value: 'folk-hero', label: 'Héroe del pueblo'},
  {value: 'guild-artisan', label: 'Artesano gremial'},
  {value: 'hermit', label: 'Ermitaño'},
  {value: 'knight', label: 'Caballero'},
  {value: 'noble', label: 'Noble'},
  {value: 'outlander', label: 'Forastero'},
  {value: 'sage', label: 'Sabio'},
  {value: 'sailor', label: 'Marinero'},
  {value: 'soldier', label: 'Soldado'},
  {value: 'urchin', label: 'Pícaro'},
]

export const languages = [
  {value: 'common', label: 'Común'},
  {value: 'dwarvish', label: 'Enano'},
  {value: 'elvish', label: 'Elfo'},
  {value: 'giant', label: 'Gigante'},
  {value: 'gnomish', label: 'Gnomo'},
  {value: 'goblin', label: 'Goblin'},
  {value: 'halfling', label: 'Mediano'},
  {value: 'orc', label: 'Orco'},
  {value: 'abyssal', label: 'Abisal'},
  {value: 'celestial', label: 'Celestial'},
  {value: 'draconic', label: 'Draconico'},
  {value: 'deep-speech', label: 'Habla de las profundidades'},
  {value: 'infernal', label: 'Infernal'},
  {value: 'primordial', label: 'Primordial'},
  {value: 'sylvan', label: 'Silvano'},
  {value: 'undercommon', label: 'Subcomún'},
]
