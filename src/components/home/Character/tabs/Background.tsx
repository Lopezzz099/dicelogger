import React from "react";
import styles from "./Background.module.css";

const Background = () => {
  return (
    <section className={styles.background}>
      <div className={styles.firstColumn}>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Detalles</p>
          </div>
          <div className={styles.detailCards}>
            <ul className={styles.listContainer}>
              <li className={styles.listItem}>
                <strong>Edad:</strong> 120
              </li>
              <li className={styles.listItem}>
                <strong>Altura:</strong> 2 metros
              </li>
              <li className={styles.listItem}>
                <strong>Peso:</strong> 100kg
              </li>
              <li className={styles.listItem}>
                <strong>Ojos:</strong> azules
              </li>
              <li className={styles.listItem}>
                <strong>Piel:</strong> pálida
              </li>
              <li className={styles.listItem}>
                <strong>Pelo:</strong> platinado
              </li>
              <li className={styles.listItem}>
                <strong>Alineamiento:</strong> caótico bueno
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Detalles</p>
          </div>
          <div className={styles.detailCards}>
            <p className={styles.storyParagraph}>
              Morydark Sparkguard, un alto elfo de Silverglade, se obsesionó con
              la magia temporal durante sus estudios académicos. Sus
              experimentos causaron un desastre en su ciudad natal, lo que lo
              llevó a exiliarse y jurar proteger a los inocentes. Ahora viaja
              por el mundo usando su magia para enfrentar la injusticia y buscar
              redención por su pasado oscuro. Su búsqueda lo lleva a desafiar
              peligros y secretos mientras lucha por un propósito mayor.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div>
        <div className={styles.column}>
          <div className={styles.titleBox}>
            <p>Detalles</p>
          </div>
          <div className={styles.detailCards}>
            <div className={styles.traitContainer}>
              <h4>Rasgo</h4>
              <p>
                Como acólito, inspiras respeto en los que comparten tu fe y
                puedes realizar las ceremonias religiosas de tu deidad. Tus
                compañeros de aventuras y tú pueden esperar recibir curación y
                cuidados gratis en un templo, santuario o cualquier
                establecimiento de tu fe, aunque deben aportar los componentes
                materiales necesarios. Quienes compartan tu religión te
                financiarán un estilo de vida moderado.
              </p>
            </div>
            <ul className={styles.listContainer}>
              <li className={styles.listItem}>
                <strong>Ideales:</strong> conocimiento. La senda hacia el poder
                y la mejoría personal está en el conocimiento.
              </li>
              <li className={styles.listItem}>
                <strong>Vínculos:</strong> el tomo que llevo conmigo es el
                registro del trabajo de toda mi vida, y no hay bóveda lo
                suficientemente segura para mantenerlo a salvo.
              </li>
              <li className={styles.listItem}>
                <strong>Defectos:</strong> haré prácticamente lo que sea para
                destapar secretos de la historia que se puedan agregar a mi
                investigación.
              </li>
              <li className={styles.listItem}>
                <strong>Rasgos de personalidad:</strong> utilizo palabras
                polisilábicas que sugieren la impresión de erudición. Además,
                paso tanto tiempo en el templo que tengo poca experiencia
                tratando con gente de manera casual.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Background;
