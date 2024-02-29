import Link from 'next/link'
import { Slug } from './NewLayout'
import styles from './NewLayout.module.css'
import React from 'react'

type NewLayoutHeaderProps = {
  title: string
  slug: Slug[]
}

const NewLayoutHeader = ({ title, slug }: NewLayoutHeaderProps) => {
  return (
    <section className={styles.header}>
      <h2>{title}</h2>
      <span className={styles.slug}>
        {slug.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <p>{item.label}</p>
            )}
            {index < slug.length - 1 && "/"}
          </React.Fragment>
        ))}
      </span>
    </section>
  )
}

export default NewLayoutHeader