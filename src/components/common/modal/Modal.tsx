"use client"

import React from "react";
import styles from "./Modal.module.css";
import Close from "@/components/icons/ui/Close";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className={`${styles.modalContainer} ${!open ? styles.invisible : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={`${styles.modal} ${open ? styles.show : ""}`}>
        <button className={styles.modalBtn} onClick={onClose}><Close size={28} /></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
