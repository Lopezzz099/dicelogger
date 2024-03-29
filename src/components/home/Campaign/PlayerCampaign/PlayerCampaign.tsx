import Image from "next/image";
import React from "react";
import styles from "./PlayerCampaign.module.css";

export type Character = {
  name: string;
  image: string;
};

type PlayerCampaignProps = {
  name: string;
  rol: string;
  icon: string;
  character: Character | null;
  id: string;
};

const PlayerCampaign = ({
  name,
  rol,
  icon,
  character,
  id,
}: PlayerCampaignProps) => {
  return (
    <div className={styles.containerPlayer} id={id}>
      {rol === "master" ? (
        <>
          <Image src={icon} alt={name} width={93} height={93} className={styles.charactersImage} />
          <p className={styles.name}>{name}</p>
          <p className={styles.rolMaster}>MASTER</p>
        </>
      ) : (
        <>
          <Image src={icon} alt={name} width={93} height={93} className={styles.charactersImage} />
          <p className={styles.name}>{name}</p>
          <p className={styles.rol}>Jugador</p>
          {character ? (
            <div className={styles.characters}>
              <Image
                src={character.image}
                alt={name}
                width={60}
                height={60}
                className={styles.charactersImage}
              />
            </div>
          ) : (
            <div>No hay personajes disponibles</div>
          )}
        </>
      )}
    </div>
  );
};

export default PlayerCampaign;
