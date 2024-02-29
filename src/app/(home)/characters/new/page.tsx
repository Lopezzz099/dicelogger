'use client'

import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Select from '@/components/common/inputs/Select'
import { races } from '@/services/hardcoded'
import Input from '@/components/common/inputs/Input'
import MultiSelect from '@/components/common/inputs/MultiSelect'
import TextArea from '@/components/common/inputs/TextArea'
import Button from '@/components/common/buttons/Button'

const NewCharacter = () => {

  const handleRace = (value: string) => {
    console.log(value)
  }

  const handleAlignment = (value: string) => {
    console.log(value)
  }

  const handleClass = (value: string) => {
    console.log(value)
  }

  const handleSkills = (value: string) => {
    console.log(value)
  }

  const handleEquipment = (value: string) => {
    console.log(value)
  }

  const handleArquetype = (value: string) => {
    console.log(value)
  }

  const handleLanguage = (value: string) => {
    console.log(value)
  }

  return (
    <section className={styles.container}>
      <form className={styles.content}>
        <h2>Nuevo personaje</h2>
        <span className={styles.slug}><Link href='#'>Plantillas</Link> / <p>Formulario</p></span>

        <section className={styles.form}>
          <h3>Información del personaje</h3>
          <section className={styles.section1} >
            <div className={styles.miniSection1}>
              <div className={styles.group}>
                <label className={styles.requiredLabel} htmlFor="name">Nombre del personaje</label>
                <Input type="text" name="name" placeholder="Escribe aquí..." required />
              </div>
              <div className={styles.group}>
                <label className={styles.requiredLabel} htmlFor="alignment">Alienamiento</label>
                <Select placeholder="Selecciona un alienamiento" options={[]} onChange={handleAlignment} />
              </div>
              <div className={styles.group}>
                <label className={styles.requiredLabel} htmlFor="race">Raza</label>
                <Select placeholder="Selecciona una raza" options={races} onChange={handleRace} />
              </div>
              <div className={styles.group}>
                <label className={styles.requiredLabel} htmlFor="class">Clase Nivel 1</label>
                <Select placeholder="Selecciona una clase" options={[]} onChange={handleClass} />
              </div>
              <div className={styles.group}>
                <label htmlFor="age">Edad</label>
                <Input type="text" name="age" placeholder="Escribe aquí..." required />
              </div>
              <div className={styles.group}>
                <label htmlFor="hair">Pelo</label>
                <Input type="text" name="hair" placeholder="Escribe aquí..." required />
              </div>
              <div className={styles.group}>
                <label htmlFor="eyes">Ojos</label>
                <Input type="text" name="eyes" placeholder="Escribe aquí..." required />
              </div>
              <div className={styles.group}>
                <label htmlFor="skin">Piel</label>
                <Input type="text" name="skin" placeholder="Escribe aquí..." required />
              </div>
              <div className={styles.group}>
                <label htmlFor="height">Altura</label>
                <Input type="text" name="height" placeholder="Escribe aquí..." required />
              </div>
              <div className={styles.group}>
                <label htmlFor="weight">Peso</label>
                <Input type="text" name="weight" placeholder="Escribe aquí..." required />
              </div>
            </div>
          </section>
          <section className={styles.section2}>
            <div className={styles.group}>
              <label htmlFor="skills">Competencia con habilidades</label>
              <MultiSelect onChange={handleSkills} options={[]} selectedOptions={[]} />
            </div>
            <div className={styles.group}>
              <label htmlFor="equipment">Competencia con equipo</label>
              <MultiSelect onChange={handleEquipment} options={[]} selectedOptions={[]} />
            </div>
          </section>
          <section className={styles.section3}>
            <div className={styles.group}>
              <label htmlFor="image">Imagen del personaje</label>
              <div className={styles.imageSelect}></div>
            </div>
            <div className={styles.group}>
              <label htmlFor="lore">Historia del personaje</label>
              <TextArea disableResize className={styles.textarea} name="description" placeholder="Escribe aquí..." required />
            </div>
          </section>
        </section>
        <section className={styles.form}>
          <h3>Transfondo del personaje</h3>
          <section className={styles.section4}>
            <div className={styles.group}>
              <label className={styles.requiredLabel} htmlFor="arquetype">Trasfondo</label>
              <Select placeholder="Selecciona un trasfondo" options={[]} onChange={handleArquetype} />
            </div>
            <div className={styles.group}>
              <label className={styles.requiredLabel} htmlFor="arquetypeName">Nombre del trasfondo</label>
              <Input type="text" name="arquetypeName" placeholder="Escribe aquí..." required />
            </div>
            <div className={styles.group}>
              <label htmlFor="skills">Competencia con habilidades</label>
              <MultiSelect onChange={handleSkills} options={[]} selectedOptions={[]} />
            </div>
            <div className={styles.group}>
              <label htmlFor="equipment">Competencia con equipo</label>
              <MultiSelect onChange={handleEquipment} options={[]} selectedOptions={[]} />
            </div>
            <div className={styles.group}>
              <label htmlFor="languages">Idiomas</label>
              <MultiSelect onChange={handleLanguage} options={[]} selectedOptions={[]} />
            </div>
          </section>
          <div className={styles.group}>
            <label htmlFor="features">Rasgos</label>
            <TextArea height='5rem' className={styles.textarea} name="features" placeholder="Escribe aquí..." required />
          </div>
          <div className={styles.group}>
            <label htmlFor="personality">Rasgos de personalidad</label>
            <TextArea height='5rem' className={styles.textarea} name="personality" placeholder="Escribe aquí..." required />
          </div>
          <div className={styles.group}>
            <label htmlFor="ideals">Ideales</label>
            <TextArea height='5rem' className={styles.textarea} name="ideals" placeholder="Escribe aquí..." required />
          </div>
          <div className={styles.group}>
            <label htmlFor="bonds">Vínculos</label>
            <TextArea height='5rem' className={styles.textarea} name="bonds" placeholder="Escribe aquí..." required />
          </div>
          <div className={styles.group}>
            <label htmlFor="flaws">Defectos</label>
            <TextArea height='5rem' className={styles.textarea} name="flaws" placeholder="Escribe aquí..." required />
          </div>
        </section>
        <Button type='submit'>Crear personaje</Button>
      </form>
    </section>
  )
}

export default NewCharacter