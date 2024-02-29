import EmptyList from "./EmptyList";

const EmptyCharacterList = () => {
  return (
    <EmptyList href={'/characters/new'} title="No se han encontrado personajes..."
    image={'/assets/home/characters/AdobeStock_569282598.png'} />
  )
}

export default EmptyCharacterList;