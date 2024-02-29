'use client'

import React from 'react'
import styles from './page.module.css'
import Select from '@/components/common/inputs/Select'
import { races } from '@/services/hardcoded'
import Input from '@/components/common/inputs/Input'
import MultiSelect from '@/components/common/inputs/MultiSelect'
import TextArea from '@/components/common/inputs/TextArea'
import Button from '@/components/common/buttons/Button'
import StatInput from '@/components/home/Stat/StatInput'
import NewLayout from '@/components/home/NewLayout/NewLayout'
import FormCard from '@/components/home/NewLayout/FormCard'
import FormGroup from '@/components/home/NewLayout/FormGroup'
import formStyles from '@/components/home/NewLayout/Extra.module.css'

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
    <NewLayout title="Crear personaje" slug={[{ label: 'Personajes', href: '/characters' }, { label: 'Plantillas', href: '/characters/templates' }, { label: 'Formulario' }]}>
      <FormCard>
        <h3>Información del personaje</h3>
        <section className={styles.section1} >
          <div className={styles.miniSection1}>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="name">Nombre del personaje</label>
              <Input type="text" name="name" placeholder="Escribe aquí..." required />
            </FormGroup>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="alignment">Alienamiento</label>
              <Select placeholder="Selecciona un alienamiento" options={[]} onChange={handleAlignment} />
            </FormGroup>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="race">Raza</label>
              <Select placeholder="Selecciona una raza" options={races} onChange={handleRace} />
            </FormGroup>
            <FormGroup>
              <label className={formStyles.requiredLabel} htmlFor="class">Clase Nivel 1</label>
              <Select placeholder="Selecciona una clase" options={[]} onChange={handleClass} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="age">Edad</label>
              <Input type="text" name="age" placeholder="Escribe aquí..." required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="hair">Pelo</label>
              <Input type="text" name="hair" placeholder="Escribe aquí..." required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="eyes">Ojos</label>
              <Input type="text" name="eyes" placeholder="Escribe aquí..." required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="skin">Piel</label>
              <Input type="text" name="skin" placeholder="Escribe aquí..." required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="height">Altura</label>
              <Input type="text" name="height" placeholder="Escribe aquí..." required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="weight">Peso</label>
              <Input type="text" name="weight" placeholder="Escribe aquí..." required />
            </FormGroup>
          </div>
          <div className={styles.miniSection2}>
            <StatInput name="strength" label="Fuerza" />
            <StatInput name="dexterity" label="Destreza" />
            <StatInput name="constitution" label="Constitución" />
            <StatInput name="intelligence" label="Inteligencia" />
            <StatInput name="wisdom" label="Sabiduría" />
            <StatInput name="charisma" label="Carisma" />
          </div>
        </section>
        <section className={styles.section2}>
          <FormGroup>
            <label htmlFor="skills">Competencia con habilidades</label>
            <MultiSelect onChange={handleSkills} options={[]} selectedOptions={[]} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="equipment">Competencia con equipo</label>
            <MultiSelect onChange={handleEquipment} options={[]} selectedOptions={[]} />
          </FormGroup>
        </section>
        <section className={styles.section3}>
          <FormGroup>
            <label htmlFor="image">Imagen del personaje</label>
            <div className={formStyles.imageSelect}></div>
          </FormGroup>
          <FormGroup>
            <label htmlFor="lore">Historia del personaje</label>
            <TextArea disableResize className={formStyles.textarea} name="description" placeholder="Escribe aquí..." required />
          </FormGroup>
        </section>
      </FormCard>
      <FormCard>
        <h3>Transfondo del personaje</h3>
        <section className={styles.section4}>
          <FormGroup>
            <label className={formStyles.requiredLabel} htmlFor="arquetype">Trasfondo</label>
            <Select placeholder="Selecciona un trasfondo" options={[]} onChange={handleArquetype} />
          </FormGroup>
          <FormGroup>
            <label className={formStyles.requiredLabel} htmlFor="arquetypeName">Nombre del trasfondo</label>
            <Input type="text" name="arquetypeName" placeholder="Escribe aquí..." required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="skills">Competencia con habilidades</label>
            <MultiSelect onChange={handleSkills} options={[]} selectedOptions={[]} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="equipment">Competencia con equipo</label>
            <MultiSelect onChange={handleEquipment} options={[]} selectedOptions={[]} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="languages">Idiomas</label>
            <MultiSelect onChange={handleLanguage} options={[]} selectedOptions={[]} />
          </FormGroup>
        </section>
        <FormGroup>
          <label htmlFor="features">Rasgos</label>
          <TextArea height='5rem' className={styles.textarea} name="features" placeholder="Escribe aquí..." required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="personality">Rasgos de personalidad</label>
          <TextArea height='5rem' className={styles.textarea} name="personality" placeholder="Escribe aquí..." required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="ideals">Ideales</label>
          <TextArea height='5rem' className={styles.textarea} name="ideals" placeholder="Escribe aquí..." required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="bonds">Vínculos</label>
          <TextArea height='5rem' className={styles.textarea} name="bonds" placeholder="Escribe aquí..." required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="flaws">Defectos</label>
          <TextArea height='5rem' className={styles.textarea} name="flaws" placeholder="Escribe aquí..." required />
        </FormGroup>
      </FormCard>
      <Button type='submit'>Crear personaje</Button>
    </NewLayout>

  )
}

export default NewCharacter