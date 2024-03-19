"use client"
import styles from './Stats.module.css'
import React from 'react'
import StatInput from '../../Stat/StatInput'
import Row from '@/components/icons/other/Row'
import StatRow from './components/StatRow/StatRow'
import Circle from '@/components/icons/ui/Circle'

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
          <div className={styles.decoratedRow}>
            <Row />
            <span>+2</span>
            <p>Bonificador de competencia</p>
          </div>
          <div className={styles.decoratedRow}>
            <Row />
            <span>12</span>
            <p>Clase de armadura</p>
          </div>
          <div className={styles.decoratedRow}>
            <Row />
            <span>13</span>
            <p>Sabiduría (percepción) pasiva</p>
          </div>
        </section>
      </div>
      <div className={styles.row2}>
        <div className={styles.row2section1}>
          <div className={`${styles.row2section2}`}>
            <section className={`${styles.saveThrows} ${styles.box}`}>
              <h3>Tiradas de salvación</h3>
              <hr />
              <div className={styles.saveThrowsContent}>
                <StatRow label='Fuerza' value={0} />
                <StatRow label='Destreza' value={2} />
                <StatRow label='Constitución' value={5} filled />
                <StatRow label='Inteligencia' value={3} filled />
                <StatRow label='Sabiduría' value={0} />
                <StatRow label='Carisma' value={-2} />
              </div>
            </section>
            <div className={styles.row2section3}>
              <section className={styles.box}>
                <h4>Velocidad</h4>
                <p className={styles.bigLabel}>30 <span>pies</span></p>
              </section>
              <section className={styles.box}>
                <h4>Iniciativa</h4>
                <p className={styles.bigLabel}>+1</p>
              </section>
            </div>
            <section className={`${styles.points} ${styles.box}`}>
              <div className={styles.pointsSection}>
                <h3>Puntos de golpe:</h3>
                <p className={styles.bigLabel}>8</p>
              </div>
              <hr />
              <div className={styles.pointsSection}>
                <h3>Dado de golpe:</h3>
                <p className={styles.bigLabel}>1d6</p>
              </div>
            </section>
          </div>
          <section className={`${styles.competencies} ${styles.box}`}>
            <h3>Competencias e Idiomas</h3>
            <hr />
            <div className={styles.competenciesList}>
              <div>
                <Circle />
                <p><b>Armadura:</b> ninguna</p>
              </div>
              <div>
                <Circle />
                <p><b>Armas:</b> bastones, ballestas ligeras, dagas, dardos</p>
              </div>
              <div>
                <Circle />
                <p><b>Herramientas:</b> ninguna</p>
              </div>
              <div>
                <Circle />
                <p><b>Idiomas:</b> común, élfico, enano</p>
              </div>
            </div>
          </section>
        </div>
        <section className={`${styles.skills} ${styles.box}`}>
          <h3>Habilidades</h3>
          <hr />
          <div className={styles.skillsContent}>
            <StatRow value={2} label={'Acrobacias'} />
            <StatRow value={1} label={'Atletismo'} />
            <StatRow value={0} label={'Engaño'} />
            <StatRow value={2} label={'Historia'} />
            <StatRow value={-1} label={'Intimidación'} />
            <StatRow value={3} filled label={'Investigación'} />
            <StatRow value={1} label={'Medicina'} />
            <StatRow value={2} label={'Naturaleza'} />
            <StatRow value={0} label={'Percepción'} />
            <StatRow value={4} filled label={'Perspicacia'} />
            <StatRow value={0} label={'Persuasión'} />
            <StatRow value={-3} label={'Religión'} />
            <StatRow value={1} label={'Sigilo'} />
            <StatRow value={0} label={'Supervivencia'} />
            <StatRow value={2} label={'Trato con animales'} />
          </div>
        </section>
      </div>
    </section>
  )
}

export default Stats