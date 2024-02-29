import Add from '@/components/icons/ui/Add';
import styles from './EmptyList.module.css';
import Link from 'next/link';

type EmptyListProps = {
  title?: string;
  image?: string;
  href: string;
}

const EmptyList = ({ title, image, href }: EmptyListProps) => {
  if (!title) {
    title = 'No se han encontrado items...';
  }

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <Link href={href} className={styles.add}>
        { image && (
          <img src={image} alt="Add" />
        )}
        <Add />
      </Link>
      <p>Presiona aquí para crear uno</p>
    </div>
  );
};

export default EmptyList;