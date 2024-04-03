"use client";
import styles from "./Stats.module.css";
import React from "react";
import StatInput from "../../Stat/StatInput";
import Row from "@/components/icons/other/Row";
import StatRow from "./components/StatRow/StatRow";
import Circle from "@/components/icons/ui/Circle";
import SpartanHelmet from "@/components/icons/SpartanHelmet";
import CrossedSword from "@/components/icons/CrossedSword";
import DigDug from "@/components/icons/DigDug";
import Talk from "@/components/icons/Talk";
import { backgrounds } from '../../../../services/hardcoded';

type StatsProps = {
  str: number;
  dex: number;
  int: number;
  con: number;
  wiz: number;
  cha: number;
  speed: number;
  hitpoints: number;
  hitdice: string;
  languages: string;
};

const Stats = ({ str, dex, int, con, wiz, cha, speed, hitpoints, hitdice, languages }: StatsProps) => {
  return (
    <section className={styles.stats}>
      <div className={styles.row1}>
        <section className={styles.row1section1}>
          <StatInput label="Fuerza" name="strength" total={str} hideButtons />
          <StatInput
            label="Destreza"
            name="dexterity"
            total={dex}
            hideButtons
          />
          <StatInput
            label="Constitución"
            name="constitution"
            total={con}
            hideButtons
          />
          <StatInput
            label="Inteligencia"
            name="intelligence"
            total={int}
            hideButtons
          />
          <StatInput label="Sabiduría" name="wisdom" total={wiz} hideButtons />
          <StatInput label="Carisma" name="charisma" total={cha} hideButtons />
        </section>
        <section className={styles.row1section2}>
          <div className={styles.decoratedRow}>
            <Row />
            <span>+3</span>
            <p>Bonificador de competencia</p>
          </div>
          <div className={styles.decoratedRow}>
            <Row />
            <span>12</span>
            <p>Clase de armadura</p>
          </div>
          <div className={styles.decoratedRow}>
            <Row />
            <span>11</span>
            <p>Sabiduría (percepción) pasiva</p>
          </div>
        </section>
      </div>
      <div className={styles.row2}>
        <div className={styles.row2section1}>
          <div className={`${styles.row2section2}`}>
            <div className={styles.row2section4}>
              <section className={`${styles.saveThrows} ${styles.box}`}>
                <h3>Tiradas de salvación</h3>
                <hr />
                <div className={styles.saveThrowsContent}>
                  <StatRow label="Fuerza" value={1} filled />
                  <StatRow label="Destreza" value={4} filled />
                  <StatRow label="Constitución" value={1} />
                  <StatRow label="Inteligencia" value={2} />
                  <StatRow label="Sabiduría" value={-1} />
                  <StatRow label="Carisma" value={3} />
                </div>
              </section>
              <div className={styles.row2section3}>
                <section className={styles.box}>
                  <h4>Velocidad</h4>
                  <p className={styles.bigLabel}>
                    {speed} <span>pies</span>
                  </p>
                </section>
                <section className={styles.box}>
                  <h4>Iniciativa</h4>
                  <p className={styles.bigLabel}>+1</p>
                </section>
              </div>
            </div>
            <section className={`${styles.points} ${styles.box}`}>
              <div className={styles.pointsSection}>
                <h3>Puntos de golpe:</h3>
                <p className={styles.bigLabel}>{hitpoints}</p>
              </div>
              <hr />
              <div className={styles.pointsSection}>
                <h3>Dado de golpe:</h3>
                <p className={styles.bigLabel}>{hitdice}</p>
              </div>
            </section>
          </div>
          <section className={`${styles.competencies} ${styles.box}`}>
            <h3>Competencias e Idiomas</h3>
            <hr />
            <div className={styles.competenciesList}>
              <div>
                <SpartanHelmet />
                <p>
                  <b>Armadura:</b> ligera
                </p>
              </div>
              <div>
                <CrossedSword />
                <p>
                  <b>Armas:</b> dagas, dardos
                </p>
              </div>
              <div>
                <DigDug />
                <p>
                  <b>Herramientas:</b> ninguna
                </p>
              </div>
              <div>
                <Talk />
                <p>
                  <b>Idiomas:</b> {languages}
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className={`${styles.skills} ${styles.box}`}>
          <h3>Habilidades</h3>
          <hr />
          <div className={styles.skillsContent}>
            <StatRow value={2} label={"Acrobacias"} />
            <StatRow value={1} label={"Atletismo"} />
            <StatRow value={0} label={"Engaño"} />
            <StatRow value={2} label={"Historia"} />
            <StatRow value={-1} label={"Intimidación"} />
            <StatRow value={3} filled label={"Investigación"} />
            <StatRow value={1} label={"Medicina"} />
            <StatRow value={2} label={"Naturaleza"} />
            <StatRow value={0} label={"Percepción"} />
            <StatRow value={4} filled label={"Perspicacia"} />
            <StatRow value={0} label={"Persuasión"} />
            <StatRow value={-3} label={"Religión"} />
            <StatRow value={1} label={"Sigilo"} />
            <StatRow value={0} label={"Supervivencia"} />
            <StatRow value={2} label={"Trato con animales"} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Stats;
