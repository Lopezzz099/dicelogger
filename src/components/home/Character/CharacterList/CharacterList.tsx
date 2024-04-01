"use client";

import CharacterFilter from "@/components/home/List/CharacterFilter";
import List from "@/components/home/List/List";
import { useState } from "react";
import EmptyCharacterList from "../../EmptyList/EmptyCharacterList";
import CardCharacter from "../CardCharacter/CardCharacter";

type CharacterListProps = {
  characters: any;
};

const CharacterList = ({ characters }: CharacterListProps) => {

  const [search, setSearch] = useState("");

  const filter = (campaign: any) => {
    return campaign.name.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <List
      search={search}
      setSearch={setSearch}
      addHref={"/characters/templates"}
      title="Mis personajes"
      filter={<CharacterFilter />}
      type={characters.length > 0 ? "character" : "empty"}
    >
      {characters.length > 0 ? (
        characters.filter(filter).map((object: any, index: number) => {
          return (
            <CardCharacter
              key={index}
              id={object.character_id}
              img={object.img}
              name={object.name}
              level={object.level}
              color={object.color}
              clase={object.class}
            />
          );
        })
      ) : (
        <EmptyCharacterList />
      )}
    </List>
  );
};

export default CharacterList;
