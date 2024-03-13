'use client'

import Logout from '@/components/icons/ui/Logout'
import styles from './CharacterTabs.module.css'
import { useState } from 'react'
import Stats from './tabs/Stats'
import Background from './tabs/Background'
import Equipment from './tabs/Equipment'
import Spells from './tabs/Spells'
import Traits from './tabs/Traits'

const CharacterTabs = () => {

  const possibleTabs = ['stats', 'background', 'equipment', 'spells', 'traits']
  const [activeTab, setActiveTab] = useState('stats')

  const handleTab = (tab: string) => {
    return () => setActiveTab(tab)
  }

  const selectedTab = () => {
    switch (activeTab) {
      case 'stats':
        return <Stats />
      case 'background':
        return <Background />
      case 'equipment':
        return <Equipment />
      case 'spells':
        return <Spells />
      case 'traits':
        return <Traits />
    }
  }

  return (
    <div className={styles.container}>
      <nav className={styles.tabs}>
        <button onClick={handleTab('stats')} className={activeTab === 'stats' ? styles.active : ''}>
          <Logout />
          <span>Estadísticas</span>
        </button>
        <button onClick={handleTab('background')} className={activeTab === 'background' ? styles.active : ''}>
          <Logout />
          <span>Trasfondo</span>
        </button>
        <button onClick={handleTab('equipment')} className={activeTab === 'equipment' ? styles.active : ''}>
          <Logout />
          <span>Equipo</span>
        </button>
        <button onClick={handleTab('spells')} className={activeTab === 'spells' ? styles.active : ''}>
          <Logout />
          <span>Conjuros</span>
        </button>
        <button onClick={handleTab('traits')} className={activeTab === 'traits' ? styles.active : ''}>
          <Logout />
          <span>Rasgos</span>
        </button>
      </nav>
      <div className={styles.content}>
        {selectedTab()}
      </div>
    </div>
  )
}

export default CharacterTabs