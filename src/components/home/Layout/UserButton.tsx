"use client";

import Settings from "@/components/icons/ui/Settings";
import styles from "./Layout.module.css";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logout from "@/components/icons/ui/Logout";
import Person from "@/components/icons/ui/Person";
import Group from "@/components/icons/ui/Group";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

const UserButton = () => {
  const router = useRouter();
  

  // const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

  const { user, logout } = useUser()

  useEffect(() => {
    console.log(user);
        
    if (!user) {
      redirect("/landing");
    }
  }, [user]);

  const handleLogout = () => {
    // window.localStorage.removeItem("user");
    logout()
    router.push("/landing");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <button className={styles.user} onClick={handleOpen}>
        <span className={styles.userImage}>
          <img src="/user.png" alt={`Foto de ${user?.username}`} />
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
