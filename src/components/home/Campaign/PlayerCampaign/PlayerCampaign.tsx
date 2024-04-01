import Image from "next/image";
import React from "react";
import styles from "./PlayerCampaign.module.css";
import Add from "@/components/icons/ui/Add";

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
  modalOpen: () => void
};

const PlayerCampaign = ({
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
                    "https://dicelogger-images.s3.sa-east-1.amazonaws.com/49c3adb9-d28c-499c-8b7e-b74789356ef1.webp"
                  }
                  alt={name}
                  width={60}
                  height={60}
                  className={styles.charactersImage}
                />
              ) : (
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
