import React from "react";
import styles from "./BoxSuscription.module.css";
import Link from "next/link";

export type BoxSuscriptionProps = {
    title: string;
    text: string;
};

const BoxSuscription = ({ title, text }: BoxSuscriptionProps) => {
    return (
        <div className={styles.BoxSuscription}>
            <p>{title}</p>
            <p>{text}</p>
        </div>
    );
};

export default BoxSuscription;
