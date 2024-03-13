"use client"

import CharacterFilter from "@/components/home/List/CharacterFilter"
import List from "@/components/home/List/List"
import { useState } from "react"
import EmptyCharacterList from "../EmptyList/EmptyCharacterList"
import CardCharacter from "../CardCharacter/CardCharacter"

type CharacterListProps = {
  characters: any;
}

const CharacterList = ({ characters }: CharacterListProps) => {

  const [search, setSearch] = useState('')

  const filter = (character: any) => {
    return character.name.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <List search={search} 
    setSearch={setSearch} 
    addHref={'/characters/new'} 
    title='Mis personajes'
    filter={<CharacterFilter />}>
      {characters.length > 0 ? (
        characters.filter(filter).map((object: any, index: number) => (
          <CardCharacter
            key={index}
            id={index}
            img={object.img}
            name={object.name}
            level={object.level}
            color={object.color}
            icon={object.icon}
          />
        ))
      ) : (
        <EmptyCharacterList />
      )}
    </List>
  )
}

export default CharacterList
