import Image from "next/image";
import React from "react";
import styles from "./PlayerCampaign.module.css";

export type Character = {
  character: string;
};

type PlayerCampaignProps = {
  name: string;
  rol: string;
  icon: string;
  characters?: Character[] | undefined;
  key: number;
};

const PlayerCampaign = ({
  name,
  rol,
  icon,
  characters,
  key,
}: PlayerCampaignProps) => {
  return (
    <div className={styles.containerPlayer} key={key}>
      {rol === "master" ? (
        <>
          <Image src={icon} alt={name} width={93} height={93} />
          <p className={styles.name}>{name}</p>
          <p className={styles.rolMaster}>MASTER</p>
        </>
      ) : (
        <>
          <Image src={icon} alt={name} width={93} height={93} />
          <p className={styles.name}>{name}</p>
          <p className={styles.rol}>Jugador</p>
          {characters && characters.length > 0 ? (
            <div className={styles.characters}>
              <Image
                src={characters[0].character}
                alt={name}
                width={60}
                height={60}
                className={styles.charactersImage}
              />
              {characters.length > 1 && (
                <p className={styles.charactersText}>{`+${
                  characters.length - 1
                }`}</p>
              )}
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
