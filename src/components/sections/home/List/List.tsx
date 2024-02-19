import Input from "@/components/common/inputs/Input";
import styles from "./List.module.css";
import Search from "@/components/icons/ui/Search";
import Tune from "@/components/icons/ui/Tune";

export type ListProps = {
  title: string;
  children?: React.ReactNode;
};

const List = (props: ListProps) => {
  return (
    <section className={styles.list}>
      <section className={styles.header}>
        <h2>{props.title}</h2>
        <div className={styles.searchContainer}>
          <Input className={styles.search} placeholder="Buscar"><Search /></Input>
          <button className={styles.filter}>
            <Tune />
          </button>
        </div>
      </section>
      <hr />
      <div className={styles.items}>
        {props.children}
      </div>
    </section>
  );
};

export default List;
