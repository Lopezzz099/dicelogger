import React from 'react'
import styles from './FormGroup.module.css'

const FormGroup = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const extraClass = className ? " " + className : ''
  
  return (
    <div className={styles.group + extraClass}>
      { children }
    </div>
  )
}

export default FormGroup