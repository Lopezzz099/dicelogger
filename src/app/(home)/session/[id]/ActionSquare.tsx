"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import DiceEvent from "./DiceEvent";

type ActionSquareProps = {
  icon: React.ReactNode;
  active: boolean;
  display: React.ReactNode
  handleActive: () => void;
};

const ActionSquare = ({
  icon,
  active = false,
  handleActive,
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
      {active && (
        <>
          {display}
        </>
      )}
      <div
        onClick={handleActive}
        className={styles.actionSquare}
        style={{ border: active ? "1px solid var(--primary)" : "" }}
      >
        {icon}
      </div>
    </div>
  );
};

export default ActionSquare;
