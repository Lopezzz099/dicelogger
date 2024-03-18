'use client'

import { useState } from 'react';
import styles from './Dado.module.css'; // Importar los estilos CSS module

const Dado = () => {
  const [resultado, setResultado] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const tirarDado = () => {
    setIsRolling(true);
    setTimeout(() => {
      const nuevoResultado = Math.floor(Math.random() * 20) + 1;
      setResultado(nuevoResultado);
      setIsRolling(false);
    }, 2000); // Cambiar la duración de la animación según sea necesario
  };

  return (
    <div className={styles.dadoContainer}> {/* Usar la clase CSS module */}
      <button onClick={tirarDado} className={styles.tirarButton} disabled={isRolling}>
        {isRolling ? 'Lanzando...' : 'Tirar Dado'}
      </button>
      <div className={`${styles.dado} ${isRolling ? styles.rolling : ''}`}> {/* Usar las clases CSS module */}
        <div className={styles.dadoFace}>
          {resultado && <span>{resultado}</span>}
        </div>
      </div>
    </div>
  );
};

export default Dado;





