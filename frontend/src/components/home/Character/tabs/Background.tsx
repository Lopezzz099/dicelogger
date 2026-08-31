import React from "react";
import styles from "./Background.module.css";

type BackgroundProps = {
  name: string;
  story: string;
  ideals: string;
  bond: string;
  flaws: string;
  trait: string;
  personality_traits: string;
  age: number;
  hair: string;
  eyes: string;
  skin: string;
  height: number;
  weight: number;
  alignment: string;
};

const Background = ({
  name,
  story,
  ideals,
  bond,
  flaws,
  trait,
  personality_traits,
  age,
  hair,
  eyes,
  skin,
  height,
  weight,
  alignment,
}: BackgroundProps) => {
  return (
    <section className={styles.background}>
      <div className={styles.column}>
        <div className={styles.titleBox}>
          <p>Detalles</p>
        </div>
        <div className={styles.detailCards}>
          <ul className={styles.listContainer}>
            <li className={styles.listItem}>
              <strong>Edad:</strong> {age ? age + " años" : "desconocida"}
            </li>
            <li className={styles.listItem}>
              <strong>Altura:</strong>{" "}
              {height ? height + " metros" : "desconocida"}
            </li>
            <li className={styles.listItem}>
              <strong>Peso:</strong> {weight ? weight + "kg" : "desconocida"}
            </li>
            <li className={styles.listItem}>
              <strong>Ojos:</strong> {eyes ? eyes : "desconocido"}
            </li>
            <li className={styles.listItem}>
              <strong>Piel:</strong> {skin ? skin : "desconocida"}
            </li>
            <li className={styles.listItem}>
              <strong>Pelo:</strong> {hair ? hair : "desconocido"}
            </li>
            <li className={styles.listItem}>
              <strong>Alineamiento:</strong>{" "}
              {alignment ? alignment : "desconocido"}
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.titleBox}>
            <p>Historia</p>
          </div>
          <div className={styles.detailCards}>
            <p className={styles.storyParagraph}>
              {story ? story : "desconocida"}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.column}>
        <div className={styles.titleBox}>
          <p>Trasfondo: {name ? name : "desconocido"}</p>
        </div>
        <div className={styles.detailCards}>
          <div className={styles.traitContainer}>
            <h4>Rasgo</h4>
            <p>{trait ? trait : "desconocido"}</p>
          </div>
          <ul className={styles.listContainer}>
            <li className={styles.listItem}>
              <strong>Ideales:</strong> {ideals ? ideals : "desconocidos"}
            </li>
            <li className={styles.listItem}>
              <strong>Vínculos:</strong> {bond ? bond : "desconocidos"}
            </li>
            <li className={styles.listItem}>
              <strong>Defectos:</strong> {flaws ? flaws : "desconocidos"}
            </li>
            <li className={styles.listItem}>
              <strong>Rasgos de personalidad:</strong>{" "}
              {personality_traits ? personality_traits : "desconocidos"}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Background;
