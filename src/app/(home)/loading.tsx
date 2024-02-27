import styles from './Loading.module.css';

const Loading = () => {
  return (
    <section className={styles.loading}>
      <div className={styles.spinner}></div>
    </section>
  )
}

export default Loading;