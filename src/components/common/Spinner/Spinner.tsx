import styles from './Spinner.module.css'

type SpinnerProps = {
  size?: string
}

const Spinner = ({ size = '3rem'}: SpinnerProps) => {
  const style = {
    width: size,
    height: size
  }
  return (
    <div style={style} className={styles.spinner}></div>
  )
}

export default Spinner