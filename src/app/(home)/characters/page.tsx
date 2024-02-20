import List from '@/components/sections/home/List/List'
import React from 'react'
import itemsCardsCharacters from './itemsCardsCharacters'
import CardCharacter from '@/components/home/CardCharacter/CardCharacter'

const Characters = () => {
  return (
    <List title='Mis personajes'>
      {itemsCardsCharacters.map((object, index) => (
        <CardCharacter
          key={index}
          img={object.img}
          name={object.name}
          level={object.level}
          color={object.color}
          icon={object.icon}
        />
      ))}
    </List>
  )
}

export default Characters