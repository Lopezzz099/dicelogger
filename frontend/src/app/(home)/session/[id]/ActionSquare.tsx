"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import DiceEvent from "./DiceEvent";
import Modal from "@/components/common/modal/Modal";

type ActionSquareProps = {
  icon: React.ReactNode;
  open: boolean;
  display: React.ReactNode
  handleOpen: (value: boolean) => void;
};

const ActionSquare = ({
  icon,
  open,
  handleOpen,
  display
}: ActionSquareProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.actionSquareContainer}>
      {/* {active && (
        <>
          {display}
        </>
      )} */}
      <div
        onClick={() => { handleOpen(!open) }}
        className={styles.actionSquare}
        style={{ border: open ? "1px solid var(--primary)" : "" }}
      >
        {icon}
      </div>
      <Modal open={open} onClose={() => { handleOpen(false) }} className={styles.modalEvent}>
        {display}
      </Modal>
    </div>
  );
};

export default ActionSquare;
