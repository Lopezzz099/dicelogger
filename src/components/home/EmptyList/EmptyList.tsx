import Add from '@/components/icons/ui/Add';
import styles from './EmptyList.module.css';

type EmptyListProps = {
  title?: string;
  image?: string;
}

const EmptyList = ({ title, image }: EmptyListProps) => {
  if (!title) {
    title = 'No se han encontrado items...';
  }

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <button className={styles.add}>
        { image && (
          <img src={image} alt="Add" />
        )}
        <Add />
      </button>
      <p>Presiona aquí para crear uno</p>
    </div>
  );
};

export default EmptyList;