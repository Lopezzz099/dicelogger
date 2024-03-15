import styles from './Character.module.css'
import CharacterHeader from './CharacterHeader'
import CharacterTabs from './CharacterTabs'

const Character = () => {
  return (
    <div className={styles.container}>
      <CharacterHeader />
      <CharacterTabs />
    </div>
  )
}

export default Character