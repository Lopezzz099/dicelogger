"use client"

import React from "react";
import styles from "./Modal.module.css";
import Close from "@/components/icons/ui/Close";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string
};

const Modal = ({ open, onClose, children, className }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className={`${styles.modalContainer} ${!open ? styles.invisible : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={`${className ? className : ""} ${styles.modal} ${open ? styles.show : ""}`}>
        <button className={styles.modalBtn} onClick={onClose}><Close size={28} /></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
