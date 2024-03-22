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
  // console.log(characters);
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
    >
      {characters.length > 0 ? (
        characters.filter(filter).map((object: any, index: number) => {
          // console.log(object);
          return (
            <CardCharacter
              key={index}
              id={object.characterid}
              img={object.img}
              name={object.name}
              level={object.level}
              color={object.color}
              clase={object.class.name}
              icon={object.icon}
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
