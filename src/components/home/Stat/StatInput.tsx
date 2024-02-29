import React from 'react'
import styles from './Stat.module.css'
import Stat from '@/components/icons/other/Stat'

type StatInputProps = {
  name: string
  label: string

}

const StatInput = ({ name, label }: StatInputProps) => {
  return (
    <article className={styles.stat}>
      <Stat />
      <label htmlFor={name}>{label}</label>
      <input className={styles.total} name={name} type="number" min="0" max="30" />
      <input className={styles.modifier} name={name} type="number" min="0" max="30" />
      <div className={styles.buttons}>
        <button type="button" className={styles.button}>-</button>
        <button type="button" className={styles.button}>+</button>
      </div>
    </article>
  )
}

export default StatInput