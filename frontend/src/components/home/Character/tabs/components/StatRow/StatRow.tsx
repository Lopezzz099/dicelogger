import Circle from "@/components/icons/ui/Circle"
import CircleFilled from "@/components/icons/ui/CircleFilled"
import styles from './StatRow.module.css'

type StatRowProps = {
  label: string
  value: number
  filled?: boolean
}

const StatRow = ({ label, value, filled}: StatRowProps) => {
  return (
    <div className={styles.statrow}>
      <span className={styles.label}>
        { filled ? <CircleFilled /> : <Circle /> }
        <p>{label}</p>
      </span>
      <p className={styles.value}>{value > 0 ? '+' : ''}{value}</p>
    </div>
  )
}

export default StatRow