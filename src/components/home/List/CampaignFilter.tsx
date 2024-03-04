import React, { useState } from 'react'
import FilterButton from './FilterButton'
import MultiSelect from '@/components/common/inputs/MultiSelect'
import Select from '@/components/common/inputs/Select'
import Button from '@/components/common/buttons/Button'

const CampaignFilter = () => {

  const [selectedCharacter, setSelectedCharacter] = useState<string>('')

  const characters = [
    { value: 'Sylvanas Windrunner', label: 'Sylvanas Windrunner' },
    { value: 'Anduin Wrynn', label: 'Anduin Wrynn' },
    { value: 'Jaina Proudmoore', label: 'Jaina Proudmoore' },
    { value: 'Thrall', label: 'Thrall' },
    { value: 'Varian Wrynn', label: 'Varian Wrynn' },
    { value: 'Garrosh Hellscream', label: 'Garrosh Hellscream' },
    { value: 'Genn Greymane', label: 'Genn Greymane' },
    { value: 'Tyrande Whisperwind', label: 'Tyrande Whisperwind' },
    { value: 'Malfurion Stormrage', label: 'Malfurion Stormrage' },
  ]

  const handleCharacter = (value: string) => {
    setSelectedCharacter(value)
  }

  const handleClear = () => {
    setSelectedCharacter('')
  }

  return (
    <FilterButton>
      <Select options={characters}
        onChange={handleCharacter}
        value={selectedCharacter}
        placeholder='Seleccionar personaje' />
      <Button onClick={handleClear} type='button'>Borrar filtros</Button>
    </FilterButton>
  )
}

export default CampaignFilter