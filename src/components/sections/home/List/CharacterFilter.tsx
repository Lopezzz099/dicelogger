"use client";

import React, { useState } from 'react';
import FilterButton from './FilterButton';
import MultiSelect from '@/components/common/inputs/MultiSelect';
import Select from '@/components/common/inputs/Select';
import Button from '@/components/common/buttons/Button';
import { classes, races } from '@/services/hardcoded';

const CharacterFilter = () => {

  // Razas
  const [selectedRaces, setSelectedRaces] = useState<string[]>([])
  const handleRace = (value: string) => {
    if (selectedRaces.includes(value)) {
      setSelectedRaces(selectedRaces.filter(r => r !== value))
    } else {
      setSelectedRaces([...selectedRaces, value])
    }
  }

  // Clases
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const handleClass = (value: string) => {
    if (selectedClasses.includes(value)) {
      setSelectedClasses(selectedClasses.filter(c => c !== value))
    } else {
      setSelectedClasses([...selectedClasses, value])
    }
  }

  // Campaña
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const campaigns = [
    { value: 'Clásico', label: 'Clásico' },
    { value: 'Burning Crusade', label: 'Burning Crusade' },
    { value: 'Wrath of the Lich King', label: 'Wrath of the Lich King' },
    { value: 'Cataclysm', label: 'Cataclysm' },
    { value: 'Mists of Pandaria', label: 'Mists of Pandaria' },
    { value: 'Warlords of Draenor', label: 'Warlords of Draenor' },
    { value: 'Legion', label: 'Legion' },
    { value: 'Battle for Azeroth', label: 'Battle for Azeroth' },
    { value: 'Shadowlands', label: 'Shadowlands' },
  ]

  const handleCampaign = (value: string) => {
    setSelectedCampaign(value)
  }

  const handleClear = () => {
    setSelectedRaces([])
    setSelectedClasses([])
    setSelectedCampaign('')
  }

  return (
    <FilterButton>
      <MultiSelect options={races}
        onChange={handleRace}
        selectedOptions={selectedRaces}
        placeholder='Filtrar por raza' />
      <MultiSelect options={classes}
        onChange={handleClass}
        selectedOptions={selectedClasses}
        placeholder='Filtrar por clase' />
      <Select options={campaigns}
        onChange={handleCampaign}
        value={selectedCampaign}
        placeholder='Seleccionar campaña' />
      <Button onClick={handleClear} type='button'>Borrar filtros</Button>
    </FilterButton>
  )
}

export default CharacterFilter