import React from 'react'
import CharacterList from '@/components/home/CharacterList/CharacterList'

const getCharacters = async () => {
  const response = await fetch(process.env.URL + '/api/characters');
  const characters = await response.json();
  return characters;
};

const Characters = async () => {

  // TODO: type characters
  const characters: any = await getCharacters();

  return (
    <CharacterList characters={characters} />
  )
  
}

export default Characters