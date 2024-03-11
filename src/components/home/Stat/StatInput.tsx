import React from 'react'
import styles from './Stat.module.css'
import Stat from '@/components/icons/other/Stat'

type StatInputProps = {
  name: string
  label: string
  total?: number
  extra: number
  onChange: (name: string, number: number) => void
}

const StatInput = ({ name, label, total, extra, onChange }: StatInputProps) => {
  
  const handleAdd = () => {
    onChange(name, extra + 1)
  }

  const handleSubstract = () => {
    onChange(name, extra - 1)
  }

  // 1 = -5
  // 2-3 = -4
  // 4-5 = -3
  // 6-7 = -2
  // 8-9 = -1
  // 10-11 = 0
  // 12-13 = 1
  // 14-15 = 2
  // 16-17 = 3
  // 18-19 = 4
  // 20-21 = 5
  // 22-23 = 6
  // 24-25 = 7
  // 26-27 = 8
  // 28-29 = 9
  // 30 = 10
  const modifier = Math.floor((total as number - 10) / 2)
  const symbol = modifier > 0 ? '+' : modifier < 0 ? '-' : ''
  return (
    <article className={styles.stat}>
      <Stat />
      <label htmlFor={name}>{label}</label>
      {/* <input className={styles.total} name={name} type="number" min="0" max="30" /> */}
      <span className={styles.total}>{ symbol }{ modifier }</span>
      <input className={styles.modifier} name={name} type="number" value={total} min="0" max="30" />
      <div className={styles.buttons}>
        <button onClick={handleSubstract} type="button" className={styles.button}>-</button>
        <button onClick={handleAdd} type="button" className={styles.button}>+</button>
      </div>
    </article>
  )
}

export default StatInput