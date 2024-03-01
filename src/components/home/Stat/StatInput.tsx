import React from 'react'
import styles from './Stat.module.css'
import Stat from '@/components/icons/other/Stat'

type StatInputProps = {
  name: string
  label: string
  total?: number
  modifier: number
  onChange: (name: string, number: number) => void
}

const StatInput = ({ name, label, total, modifier, onChange }: StatInputProps) => {
  
  const handleAdd = () => {
    onChange(name, modifier + 1)
  }

  const handleSubstract = () => {
    onChange(name, modifier - 1)
  }
  
  return (
    <article className={styles.stat}>
      <Stat />
      <label htmlFor={name}>{label}</label>
      {/* <input className={styles.total} name={name} type="number" min="0" max="30" /> */}
      <span className={styles.total}>{total ? total : "-"}</span>
      <input className={styles.modifier} name={name} type="number" value={modifier} min="0" max="30" />
      <div className={styles.buttons}>
        <button onClick={handleSubstract} type="button" className={styles.button}>-</button>
        <button onClick={handleAdd} type="button" className={styles.button}>+</button>
      </div>
    </article>
  )
}

export default StatInput