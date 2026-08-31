import styles from './NewLayout.module.css'
import Link from 'next/link'
import NewLayoutHeader from './NewLayoutHeader'

export type Slug = {
  label: string
  href?: string
}

type NewLayoutProps = {
  children: React.ReactNode
  title: string
  slug: Slug[]
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const NewLayout = ({ title, slug, children, onSubmit }: NewLayoutProps) => {
  return (
    <section className={styles.container}>
      <form onSubmit={onSubmit} className={styles.content}>
        <NewLayoutHeader title={title} slug={slug} />
        {children}
      </form>
    </section>
  )
}

export default NewLayout