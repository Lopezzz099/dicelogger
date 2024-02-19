import styles from "./List.module.css";

export type ListProps = {
  children?: React.ReactNode;
};

const List = (props: ListProps) => {
  return (
    <section className={styles.paddingList}>
      <div className={styles.sectionList}>
        {props.children}
      </div>
    </section>
  );
};

export default List;
