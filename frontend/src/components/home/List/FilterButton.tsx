'use client'
import React, { useState } from 'react'
import styles from './FilterButton.module.css'
import Tune from '@/components/icons/ui/Tune';
import Close from '@/components/icons/ui/Close';

type FilterButtonProps = {
  children?: React.ReactNode;
}

const FilterButton = ({ children }: FilterButtonProps) => {

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  }

  return (
    <div className={styles.container}>
      <button className={styles.filter} onClick={handleClick}>
        { show ? (
          <Close />
          ) : (
          <Tune />
        )}
      </button>
      <form className={styles.popup + (show ? ` ${styles.show}` : '')}>
        { children }
      </form>
    </div>
  )
}

export default FilterButton