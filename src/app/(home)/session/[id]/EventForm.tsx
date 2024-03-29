import React from 'react'
import styles from './page.module.css'
import Button from '@/components/common/buttons/Button'

type EventFormProps = {
  children: React.ReactNode
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  btnText: string
  formClassname?: string
}

const EventForm = ({ children, handleSubmit, btnText, formClassname } : EventFormProps) => {
  return (
    <div className={styles.eventFormContainer}>
      <form className={`${styles.eventForm} ${formClassname}`}>
        {children}
        <Button type='submit'>{btnText}</Button>
      </form>
      <div className={styles.formTriangle}></div>
    </div>
  )
}

export default EventForm