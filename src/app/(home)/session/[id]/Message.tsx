import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Message = () => {
  return (
    <div className={styles.message}>
      <div className={styles.userImage}>
        <img src={"/user.png"} alt="user" />
      </div>
      <div className={styles.messageBox}>
        <div className={styles.messageTriangle} />
        <div className={styles.messageContent}>
          <h4 className={styles.characterName}>Morydark Sparkguard</h4>
          <p className={styles.messageDescription}>Hace una tirada de salvación por <span>fuerza</span></p>
          <div className={styles.messageDice}>
            <p>Dado</p>
            <strong>17</strong>
          </div>
          <div className={styles.messageDice}>
            <p>Cuenta</p>
            <strong>17 + 0 - 3 = <span>14</span></strong>
          </div>
          <p>La tirada de salvación es <strong>exitosa</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
