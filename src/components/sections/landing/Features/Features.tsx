import ItemCard from "@/components/common/cards/ItemCard";
import styles from "./Features.module.css";
import Cowled from "@/components/icons/Cowled";

const Features = () => {
  return (
    <section className={styles.container + ' section'}>
      <div className={'content'}>
        <ItemCard 
        icon={<Cowled />} 
        title={'Personajes'} 
        description={'Crea tus propios personajes o utiliza los creados por nosotros'}/>
      </div>
    </section>
  )
}

export default Features;