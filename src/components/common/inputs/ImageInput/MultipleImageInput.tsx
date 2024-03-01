import Upload from '@/components/icons/ui/Upload'
import styles from './MultipleImageInput.module.css'

type MultipleImageInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  images: string[]
  name: string
}

const MultipleImageInput = ({ onChange, images, name }: MultipleImageInputProps) => {

  const handleInput = () => {
    const fileInput = document.querySelector(
      `input[name=${name}]`
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }

  console.log(images)

  return (
    <div className={styles.input}>
      <input
        name={name}
        type="file"
        multiple={true}
        accept="image/*"
        onChange={onChange}
        ref={(input) => input && (input.value = "")}
      />
      <button onClick={handleInput} type="button">
        { images.length < 1 ? (
          "Cargar más imágenes"
        ):(
          "Volver a cargar imágenes"
        )}
        <Upload size='1.5em' />
      </button>
      { images.length > 0 && (
        <p className={styles.imageAmount}>{images.length} {images.length === 1 ? "imagen cargada" : "imágenes cargadas"}</p>
      )}
    </div>
  )
}

export default MultipleImageInput