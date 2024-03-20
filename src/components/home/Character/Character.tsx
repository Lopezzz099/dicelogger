import styles from './Character.module.css'
import CharacterHeader from './CharacterHeader'
import CharacterTabs from './CharacterTabs'

const Character = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CharacterHeader />
        <CharacterTabs />
      </div>
    </div>
  )
}

export default Character