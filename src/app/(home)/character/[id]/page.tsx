
import Character from '@/components/home/Character/Character';
import { headers } from 'next/headers';
import React from 'react'

const getCharacter = async (characterId: string) => {
  const data = {
    character: {},
    info: ''
  }
  try {
    const response = await fetch(process.env.URL + '/api/characters/' + characterId);
    data.character = await response.json();
    data.info = 'Success';
  } catch (error: any) {
    data.info = error.message;
  }
  return data;
}


const CharacterPage = () => {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || "";
  const characterId = fullUrl.split('/').pop() || "";
  
  const characterData = getCharacter(characterId);

  return (
    <Character />
  )
}

export default CharacterPage