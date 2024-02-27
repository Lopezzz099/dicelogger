'use client'
import Down from '@/components/icons/ui/Down'
import styles from './LoginPopup.module.css'
import { useState } from 'react'
import Up from '@/components/icons/ui/Up'
import Input from '@/components/common/inputs/Input'
import InputPassword from '@/components/common/inputs/InputPassword'
import Button from '@/components/common/buttons/Button'
import Link from 'next/link'
import useLogin from '@/hooks/useLogin'
const LoginPopup = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }

  const login = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Fetch
    // Hardcoded localstorage for testing
    const email = (e.target as HTMLFormElement).email.value as string
    const password = (e.target as HTMLFormElement).password.value as string
    login({email, password})
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
      <form onSubmit={handleSubmit} className={`${styles.popup} ${show ? styles.show : styles.hide}`}>
          {/* <h3>Iniciar sesión</h3> */}
          <label htmlFor="email">Correo electrónico</label>
          <Input type="email" name="email" placeholder="Escribe aquí..." required />
          <label htmlFor="password">Contraseña</label>
          <InputPassword name="password" placeholder="••••••••••" required />
          <Button type='submit' className={styles.submit}>Iniciar sesión</Button>
          <hr />
          <span>¿No tienes cuenta? <Link href={'/auth/signup'}>Regístrate</Link></span>
      </form>
    </section>
  )
}

export default LoginPopup