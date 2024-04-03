"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Spells.module.css";
import MySpells from "./components/Spells/MySpells";
import AvailableSpells from "./components/Spells/AvailableSpells";

export interface Spell2 {
  spell_id: number;
  name: string;
  description: string;
  range: number;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  damage_type: string;
  difficulty_class: number;
  aoe: number;
  school: string;
}

export interface Spell {
  name: string;
  description: string;
  range: number;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  damage_type: string;
  difficulty_class: number;
  aoe: number;
  school: string;
}

interface characterClass {
  class_id: number;
  name: string;
  description: string;
  proficiency_bonus: number;
  hit_dice: string;
  armor_proficiencies: string;
  weapon_proficiencies: string;
  tool_proficiencies: string;
  spellcasting_ability: string;
}

interface characterRace {
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
}

let initialAvailableSpells: Spell2[] = [];

const initialMySpells: Spell2[] = [];

interface SpellProps {
  characterid: number;
  classId: number;
  characterClass: characterClass;
  str: number;
  dex: number;
  int: number;
  con: number;
  wiz: number;
  cha: number;
}

interface statType {
  str: number;
  dex: number;
  int: number;
  con: number;
  wiz: number;
  cha: number;
  n: number;
}

interface spellCastingAbilityType {
  wiz: string;
  int: string;
  cha: string;
  str: string;
  dex: string;

  con: string;
  n: string;
}

const spellCastingAbility: spellCastingAbilityType = {
  wiz: "Sabiduría",
  int: "Inteligencia",
  cha: "Carisma",

  str: "Fuerza",
  dex: "Destreza",

  con: "Constitución",
  n: "Ninguna",
};

const Spells = ({
  characterid,
  classId,
  characterClass,
  str,
  dex,
  int,
  con,
  wiz,
  cha,
}: SpellProps) => {
  const [mySpells, setMySpells] = useState<Spell2[]>(initialMySpells);
  const [availableSpells, setAvailableSpells] = useState<Spell2[]>(
    initialAvailableSpells
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editSpell, setEditSpell] = useState({});
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const [message, setMessage] = useState("");

  const stat: statType = {
    str,
    dex,
    int,
    con,
    wiz,
    cha,
    n: 0,
  };

  const getSpells = async (id: number): Promise<Spell2[]> => {
    try {
      const response = await fetch(`/api/spell/class/${id}`);
      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      console.error("Error fetching spells:", error.message);
      return [];
    }
  };

  const getMySpells = async (): Promise<Spell2[]> => {
    try {
      const response = await fetch(`/api/spell/character/${characterid}`);
      const responseData = await response.json();
      if (responseData.length === 0) {
        setMessage("No se encontraron conjuros");
      }
      return responseData;
    } catch (error: any) {
      console.error("Error fetching spells:", error.message);
      return [];
    }
  };

  const fetchSpells = async () => {
    const data: Spell2[] = await getSpells(classId);

    const mappedSpells: Spell2[] = data.map((d) => {
      return d;
    });
    setAvailableSpells(mappedSpells);
    initialAvailableSpells = mappedSpells;
  };

  useEffect(() => {
    fetchSpells();
  }, []);

  const fetchMySpells = async () => {
    const spells = await getMySpells();

    const mappedSpells: Spell2[] = spells?.map((d: Spell2) => {
      return d;
    });
    setMySpells(mappedSpells);
  };

  useEffect(() => {
    fetchMySpells();
  }, []);

  const addSpells = async (spell: Spell2) => {
    try {
      const body = {
        character_data_id: characterid,
        name: spell.name,
        description: spell.description,
        range: spell.range,
        ritual: spell.ritual,
        duration: spell.duration,
        concentration: spell.concentration,
        casting_time: spell.casting_time,
        level: spell.level,
        damage_type: spell.damage_type,
        difficulty_class: spell.difficulty_class,
        aoe: spell.aoe,
        school: spell.school,
      };

      const response = await fetch("/api/spell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response && response.status === 200) {
        if (!mySpells.includes(spell)) {
          fetchMySpells();
        } else {
          removeSpells(spell);
        }
      } else {
        throw new Error("Failed to add spell");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeSpells = async (spellToRemove: Spell2) => {
    try {
      const response = await fetch(
        `/api/spell/${characterid}/${spellToRemove.spell_id}`,
        {
          method: "DELETE",
        }
      );

      if (response && response.status === 200) {
        fetchMySpells();
      } else {
        throw new Error("Failed to remove spell");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      setAvailableSpells(
        initialAvailableSpells.filter((spell: any) =>
          spell.name.toLowerCase().includes(searchQuery)
        )
      );
    } else {
      setAvailableSpells(initialAvailableSpells);
    }
  }, [searchQuery]);

  const aptitudMagica: string =
    spellCastingAbility[
      characterClass.spellcasting_ability as keyof spellCastingAbilityType
    ];

  const modifier: number = Math.floor(
    (stat[characterClass.spellcasting_ability as keyof statType] - 10) / 2
  );
  const tiradaDeSalvacion = 8 + characterClass.proficiency_bonus + modifier;
  const bonusDeAtaque = modifier + characterClass.proficiency_bonus;

  return (
    <div className={styles.spellsContainer}>
      <section className={styles.characterInfo}>
        <div>
          <span>Aptitud mágica</span>
          <h4>{aptitudMagica}</h4>
        </div>
        <div>
          <span>Tirada de salvación</span>
          <h4>{tiradaDeSalvacion}</h4>
        </div>
        <div>
          <span>Bonus de ataque</span>
          <h4>{bonusDeAtaque}</h4>
        </div>
      </section>
      <div className={styles.characterSpells}>
        <MySpells
          spells={mySpells}
          removeSpells={removeSpells}
          setEditSpell={setEditSpell}
          editSpell={editSpell}
          openCreateMenu={openCreateMenu}
          setOpenCreateMenu={setOpenCreateMenu}
          message={message}
        />
        <AvailableSpells
          mySpells={mySpells}
          spells={availableSpells}
          addSpells={addSpells}
          removeSpells={removeSpells}
          onChange={onChange}
          searchQuery={searchQuery}
          editSpell={editSpell}
          setEditSpell={setEditSpell}
          openCreateMenu={openCreateMenu}
          setOpenCreateMenu={setOpenCreateMenu}
          fetchSpells={fetchMySpells}
        />
      </div>
    </div>
  );
};

export default Spells;
