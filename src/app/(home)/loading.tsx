import Spinner from '@/components/common/Spinner/Spinner';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <section className={styles.loading}>
      <Spinner />
    </section>
  )
}

export default Loading;