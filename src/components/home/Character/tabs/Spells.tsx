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

const initialAvailableSpells: Spell2[] = [];

const initialMySpells: Spell2[] = [];

interface SpellProps {
  characterid: number;
  classId: number;
}

const Spells = ({ characterid, classId }: SpellProps) => {
  const [mySpells, setMySpells] = useState<Spell2[]>(initialMySpells);
  const [availableSpells, setAvailableSpells] = useState<Spell2[]>(
    initialAvailableSpells
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editSpell, setEditSpell] = useState({});
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  console.log(editSpell);
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

      return responseData;
    } catch (error: any) {
      console.error("Error fetching spells:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchSpells = async () => {
      const data: Spell2[] = await getSpells(classId);

      const mappedSpells: Spell2[] = data.map((d) => {
        return d;
      });
      setAvailableSpells(mappedSpells);
    };

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
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      setAvailableSpells(
        availableSpells.filter((spell) =>
          spell.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
        )
      );
    } else {
      setAvailableSpells(initialAvailableSpells);
    }
  };

  return (
    <div className={styles.spellsContainer}>
      <section className={styles.characterInfo}>
        <div>
          <span>Aptitud mágica</span>
          <h4>Inteligencia</h4>
        </div>
        <div>
          <span>Tirada de salvación</span>
          <h4>13</h4>
        </div>
        <div>
          <span>Bonus de ataque</span>
          <h4>+5</h4>
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
