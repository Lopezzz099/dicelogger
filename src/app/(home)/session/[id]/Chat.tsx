"use client";

import Input from "@/components/common/inputs/Input";
import React, { useState } from "react";
import styles from "./page.module.css";
import ActionSquare from "./ActionSquare";
import D20 from "@/components/icons/D20";
import Message from "./Message";
import Stiletto from "@/components/icons/Stiletto";
import SpellBook from "@/components/icons/SpellBook";
import Cash from "@/components/icons/Cash";
import DiceEvent from "./DiceEvent";
import AttackEvent from "./AttackEvent";

const Chat = () => {
  const [active, setActive] = useState<string | false>("attack");

  const handleActive = (value: string) => {
    if (value === active) {
      setActive(false);
      return
    }
    switch (value) {
      case "dice":
        setActive("dice");
        break;
      case "attack":
        setActive("attack");
        break
      case "spell":
        setActive("spell");
        break
      case "trade":
        setActive("trade");
        break
      default:
        setActive(false);
        break
    }
  };

  return (
    <section className={styles.chat}>
      <div className={styles.messagesContainer}>
        <Message />
      </div>
      <form className={styles.chatBar}>
        <Input
          type="text"
          placeholder="Describe la acción"
          className={styles.inputChat}
        />
        <ActionSquare display={<DiceEvent />} icon={<D20 size={28} />} handleActive={() => handleActive("dice")} active={active === "dice"} />
        <ActionSquare display={<AttackEvent />} icon={<Stiletto size={28} />} handleActive={() => handleActive("attack")} active={active === "attack"} />
        <ActionSquare display={<DiceEvent />} icon={<SpellBook size={28} />} handleActive={() => handleActive("spell")} active={active === "spell"} />
        <ActionSquare display={<DiceEvent />} icon={<Cash size={28} />} handleActive={() => handleActive("trade")} active={active === "trade"} />
      </form>
    </section>
  );
};

export default Chat;
