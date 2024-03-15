'use client'

import styles from './MultiTab.module.css'
import { useState } from 'react'

type MultiTabProps = {
  tabs: Tab[]
}

const MultiTab = ({ tabs }: MultiTabProps) => {

  const [activeTab, setActiveTab] = useState(tabs[0].name)

  const handleTab = (tab: string) => {
    return () => setActiveTab(tab)
  }


  const selectedTab = () => {
    return tabs.find(tab => tab.name === activeTab)?.component
  }

  return (
    <div className={styles.container}>
      <nav className={styles.tabs}>
        {tabs.map(tab => (
          <button key={tab.name} onClick={handleTab(tab.name)} className={activeTab === tab.name ? styles.active : ''}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className={styles.content}>
        {selectedTab()}
      </div>
    </div>
  )
}

export default MultiTab