import ItemCard from "@/components/common/cards/ItemCard";
import styles from "./Features.module.css";
import items from "./items";

const Features = () => {
  return (
    <section className={styles.container + ' section'}>
      <div className={styles.features + ' content'}>
        { items.map((item, index) => (
          <ItemCard key={index} 
          icon={item.icon} 
          title={item.title} 
          description={item.description}/>
        ))}
      </div>
    </section>
  )
}

export default Features;