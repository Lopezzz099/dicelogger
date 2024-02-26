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
import Select from '@/components/common/inputs/Select'
import MultiSelect from '@/components/common/inputs/MultiSelect'
import TextArea from '@/components/common/inputs/TextArea'

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

  // to delete
  const options = [
    {value: 'activo', label: 'Activo', icon: <Up />},
    {value: 'inactivo', label: 'Inactivo'},
    {value: 'pendiente', label: 'Pendiente'},
    {value: 'suspendido', label: 'Suspendido'},
    {value: 'eliminado', label: 'Eliminado'}
  ]
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const handleSelect = (value: string) => {
    if (selectedOptions?.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value))
    } else {
      setSelectedOptions([...(selectedOptions || []), value])
    }
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
          <MultiSelect
            onChange={handleSelect}
            options={options}
            selectedOptions={selectedOptions}
          />
          <TextArea name="description" placeholder="Escribe aquí..."
          height='10rem' disableResize />
          <hr />
          <span>¿No tienes cuenta? <Link href={'/auth/signup'}>Regístrate</Link></span>
      </form>
    </section>
  )
}

export default LoginPopup