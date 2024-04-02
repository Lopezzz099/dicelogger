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
import SpellEvent from "./SpellEvent";
import TradeEvent from "./TradeEvent";

type ChatProps = {
  userCharacter: FullCharacter
  session: Session
  campaignCharacters: ShortCharacter[]
}

const Chat = () => {
  const [diceOpen, setDiceOpen] = useState(false);
  const [attackOpen, setAttackOpen] = useState(false);
  const [spellOpen, setSpellOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([])

  return (
    <section className={styles.chat}>
      <div className={styles.messagesContainer}>
        <Message />
      </div>
      <div className={styles.chatBar}>
        {/* <Input
          type="text"
          placeholder="Describe la acción"
          className={styles.inputChat}
        /> */}
        <ActionSquare display={<DiceEvent />} icon={<D20 size={28} />} open={diceOpen} handleOpen={(value: boolean) => { setDiceOpen(value) }} />
        <ActionSquare display={<AttackEvent />} icon={<Stiletto size={28} />} open={attackOpen} handleOpen={(value: boolean) => { setAttackOpen(value) }} />
        <ActionSquare display={<SpellEvent />} icon={<SpellBook size={28} />} open={spellOpen} handleOpen={(value: boolean) => { setSpellOpen(value) }} />
        <ActionSquare display={<TradeEvent />} icon={<Cash size={28} />} open={tradeOpen} handleOpen={(value: boolean) => { setTradeOpen(value) }} />
      </div>
    </section>
  );
};

export default Chat;
