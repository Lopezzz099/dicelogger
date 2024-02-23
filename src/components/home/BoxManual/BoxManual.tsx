import React from "react";
import styles from "./BoxManual.module.css";
import Link from "next/link";

export type BoxManualProps = {
  icon: React.ReactNode;
  title: string;
  link: string;
};

const BoxManual = ({ icon, title, link }: BoxManualProps) => {
  return (
    <Link href={link} className={styles.BoxManual}>
      <div className={styles.icon}>{icon}</div>
      <p>{title}</p>
    </Link>
  );
};

export default BoxManual;
