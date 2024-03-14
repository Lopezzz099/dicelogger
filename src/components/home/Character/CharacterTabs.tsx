import Logout from '@/components/icons/ui/Logout'
import Stats from './tabs/Stats'
import Background from './tabs/Background'
import Equipment from './tabs/Equipment'
import Spells from './tabs/Spells'
import Traits from './tabs/Traits'
import MultiTab from '@/components/common/tabs/MultiTab'

const CharacterTabs = () => {

  const tabs: Tab[] = [
    { name: 'stats', label: 'Estadísticas', icon: <Logout />, component: <Stats /> },
    { name: 'background', label: 'Trasfondo', icon: <Logout />, component: <Background /> },
    { name: 'equipment', label: 'Equipo', icon: <Logout />, component: <Equipment /> },
    { name: 'spells', label: 'Conjuros', icon: <Logout />, component: <Spells /> },
    { name: 'traits', label: 'Rasgos', icon: <Logout />, component: <Traits /> }
  ]

  return (
    <MultiTab tabs={tabs} />
  )
}

export default CharacterTabs