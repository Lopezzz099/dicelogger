"use client"
import styles from './Stats.module.css'
import React from 'react'
import StatInput from '../../Stat/StatInput'
import Row from '@/components/icons/other/Row'

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.row1}>
        <section className={styles.row1section1}>
          <StatInput label='Fuerza' name='strength' total={10} hideButtons />
          <StatInput label='Destreza' name='dexterity' total={10} hideButtons />
          <StatInput label='Constitución' name='constitution' total={10} hideButtons />
          <StatInput label='Inteligencia' name='intelligence' total={10} hideButtons />
          <StatInput label='Sabiduría' name='wisdom' total={10} hideButtons />
          <StatInput label='Carisma' name='charisma' total={10} hideButtons />
        </section>
        <section className={styles.row1section2}>
          <div>
            <Row />
          </div>
          <div>
            <Row />
          </div>
          <div>
            <Row />
          </div>
        </section>
      </div>
      <div className={styles.row2}>
        <div className={styles.row2section1}>
          <div className={`${styles.row2section2}`}>
            <section className={`${styles.saveThrows} ${styles.box}`}>
              <h3>Tiradas de salvación</h3>
              <hr />
              <div>
                <p>Fuerza</p>
                <p>Destreza</p>
                <p>Constitución</p>
                <p>Inteligencia</p>
                <p>Sabiduría</p>
                <p>Carisma</p>
              </div>
            </section>
            <div className={styles.row2section3}>
              <section className={styles.box}>
                <h4>Velocidad</h4>
                <p>30 pies</p>
              </section>
              <section className={styles.box}>
                <h4>Iniciativa</h4>
                <p>+1</p>
              </section>
            </div>
            <section className={`${styles.points} ${styles.box}`}>
              <h3>Puntos de golpe:</h3>
              <span>8</span>
              <hr />
              <h3>Dado de golpe:</h3>
              <span>1d6</span>
            </section>
          </div>
          <section className={`${styles.competencies} ${styles.box}`}>
            <h3>Competencias e Idiomas</h3>
            <hr />
            <div>
              <p>Armadura: Ninguna</p>
            </div>
            <div>
              <p>Armas: Ninguna</p>
            </div>
            <div>
              <p>Herramientas: Ninguna</p>
            </div>
            <div>
              <p>Idiomas: Ninguno</p>
            </div>
          </section>
        </div>
        <section className={`${styles.skills} ${styles.box}`}>
          <h3>Habilidades</h3>
          <hr />
          <div>
            <p>Acrobacias</p>
            <p>Atletismo</p>
            <p>Engaño</p>
            <p>Historia</p>
            <p>Intimidación</p>
            <p>Investigación</p>
            <p>Medicina</p>
            <p>Naturaleza</p>
            <p>Percepción</p>
            <p>Perspicacia</p>
            <p>Persuasión</p>
            <p>Religión</p>
            <p>Sigilo</p>
            <p>Supervivencia</p>
            <p>Trato con animales</p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Stats