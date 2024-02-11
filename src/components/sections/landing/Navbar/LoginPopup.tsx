'use client'
import Down from '@/components/icons/ui/Down'
import styles from './LoginPopup.module.css'
import { useState } from 'react'
import Up from '@/components/icons/ui/Up'
import Input from '@/components/common/inputs/Input'
import InputPassword from '@/components/common/inputs/InputPassword'
import Button from '@/components/common/buttons/Button'

const LoginPopup = () => {

  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }

  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
        <span>Iniciar sesión</span>
        {show ? (
          <Up size={'1em'} />
        ) : (
          <Down size={'1em'} />
        )}
      </button>
      <form className={`${styles.popup} ${show ? styles.show : styles.hide}`}>
          {/* <h3>Iniciar sesión</h3> */}
          <label htmlFor="user">Usuario</label>
          <Input type="text" name="user" placeholder="Escribe aquí..." required />
          <label htmlFor="password">Contraseña</label>
          <InputPassword name="password" placeholder="••••••••••" required />
          <Button className={styles.submit}>Iniciar sesión</Button>
      </form>
    </section>
  )
}

export default LoginPopup