import Upload from '@/components/icons/ui/Upload'
import styles from './MultipleImageInput.module.css'

const MultipleImageInput = () => {
  return (
    <div className={styles.input}>
      <button type="button">
        Cargar más imágenes
        <Upload size='1.5em' />
      </button>
    </div>
  )
}

export default MultipleImageInput