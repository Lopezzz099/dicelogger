import styles from './FormCard.module.css'

const FormCard = ({ children }: {children: React.ReactNode}) => {
  return (
    <section className={styles.form}>
      { children }
    </section>
  )
}

export default FormCard