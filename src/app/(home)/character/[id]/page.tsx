import Character from '@/components/home/Character/Character';
import React from 'react'
import { getCharacter } from './actions';

type CharacterProps = {
  params: {
    id: string
  }
}

const CharacterPage = async ({params}: CharacterProps) => {
  
  const characterData = await getCharacter(params.id);

  return (
    <Character characterData={characterData.character as any}/>
  )
}

export default CharacterPage