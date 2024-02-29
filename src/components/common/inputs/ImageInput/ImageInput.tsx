import React from 'react'
import styles from './ImageInput.module.css'
import Image from 'next/image'
import Add from '@/components/icons/ui/Add'

type ImageInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  image?: string
}

const ImageInput = ({ onChange, image }: ImageInputProps) => {
  return (
    <div className={styles.imageInput}>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={(input) => input && (input.value = "")}
      />
      <button type="button"
        onClick={() => {
          const fileInput = document.querySelector(
            "input[type=file]"
          ) as HTMLInputElement | null;
          if (fileInput) {
            fileInput.click();
          }
        }}
      >
        {image ? (
          <Image src={image} alt="Add" fill />
        ) : (
          <>
            {/* <Image
                        src="/assets/home/campaigns/Rectangle_9.png" alt="Add" fill
                      /> */}
            <Add className={styles.icon} />
          </>
        )}
      </button>
    </div>
  )
}

export default ImageInput