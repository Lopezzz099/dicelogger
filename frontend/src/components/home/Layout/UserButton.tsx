"use client";

import styles from "./Layout.module.css";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logout from "@/components/icons/ui/Logout";
import Person from "@/components/icons/ui/Person";
import Group from "@/components/icons/ui/Group";
import Link from "next/link";

const UserButton = ({user}: {user: User}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    router.push("/landing");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <button className={styles.user} onClick={handleOpen}>
        <span className={styles.userImage}>
          <img src={user.image} alt={`Foto de ${user}`} />
        </span>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.displayName}</p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>
      </button>
      <div
        onClick={handleOpen}
        className={
          styles.userPopup + (!open ? ` ${styles.userPopupClosed}` : "")
        }
      >
        <Link href="/profile">
          <Person /> Perfil
        </Link>
        <Link href="/friends">
          <Group /> Amigos
        </Link>
        {/* <a href="/settings"><Settings /> Configuración?</a> */}
        <button onClick={handleLogout}>
          <Logout /> Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default UserButton;