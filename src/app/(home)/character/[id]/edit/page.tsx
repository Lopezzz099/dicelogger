import { getBackgrounds, getClasess, getRaces } from '@/app/(home)/characters/new/action'
import UpdateCharacter from '@/components/home/Character/UpdateCharacter/UpdateCharacter'
import getUserData from '@/services/getUserData'
import { cookies } from 'next/headers'
import React from 'react'
import { getCharacter } from '../actions'
import { Character } from '@/components/home/Character/Character'

type CharacterProps = {
  params: {
    id: string
  }
}

const EditCharacter = async ({params}: CharacterProps) => {
  const dataRaces = await getRaces()
  const dataClasess = await getClasess()
  const dataBackgrounds = await getBackgrounds()
  const user = await getUserData(cookies)
  const dataCharacter = await getCharacter(params.id)

  return (
    <UpdateCharacter racesBack={dataRaces.races} clasessBack={dataClasess.clasess} user={user.id} backgroundsBack={dataBackgrounds.backgrounds} characterBack={dataCharacter.character as Character}/>
  );
}

export default EditCharacter