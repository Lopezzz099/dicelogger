import Image from "next/image";
import React from "react";
import styles from "./PlayerCampaign.module.css";
import Add from "@/components/icons/ui/Add";

export type Character = {
  name: string;
  image: string;
};

type PlayerCampaignProps = {
  isUser: boolean
  name: string;
  rol: string;
  icon: string;
  character: Character | null;
  id: string;
  modalOpen: () => any
};

const PlayerCampaign = ({
  isUser,
  name,
  rol,
  icon,
  character,
  id,
  modalOpen,
}: PlayerCampaignProps) => {
  return (
    <div className={styles.containerPlayer} id={id}>
      {rol === "master" ? (
        <>
          <Image
            src={icon}
            alt={name}
            width={93}
            height={93}
            className={styles.charactersImage}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.rolMaster}>MASTER</p>
          {
            <div className={styles.characters}>
              {character ? (
                <Image
                  src={
                    character.image
                  }
                  alt={name}
                  width={60}
                  height={60}
                  className={styles.charactersImage}
                />
              ) : isUser && (
                <button className={styles.addCharacterBtn} onClick={modalOpen}>
                  <Add color="rgba(255, 255, 255, .80)" size={42} />
                </button>
              )}
            </div>
          }
        </>
      ) : (
        <>
          <Image
            src={icon}
            alt={name}
            width={93}
            height={93}
            className={styles.charactersImage}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.rol}>Jugador</p>
          {
            <div className={styles.characters}>
              {character ? (
                <Image
                  src={
                    character.image
                  }
                  alt={name}
                  width={60}
                  height={60}
                  className={styles.charactersImage}
                />
              ) : isUser && (
                <button className={styles.addCharacterBtn} onClick={modalOpen}>
                  <Add color="rgba(255, 255, 255, .80)" size={42} />
                </button>
              )}
            </div>
          }
        </>
      )}
    </div>
  );
};

export default PlayerCampaign;
