import HomeLayout from '@/components/home/Layout/HomeLayout'
import List from '@/components/sections/home/List/List'
import React from 'react'
import itemsCardsCharacters from './itemsCardsCharacters'
import CardCharacter from '@/components/home/CardCharacter/CardCharacter'

const Characters = () => {
  return (
    <HomeLayout>
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
    </HomeLayout>
  )
}

export default Characters