"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./ProfileNavigation.module.css";
import MultiTab from "@/components/common/tabs/MultiTab";

import Security from "../AccSecurity/Security";
import Subscription from "../Subscription/Subscription";
import Profile from "../ProfileView/Profile";
import UserInfo from "../ProfileView/UserInfo";
import { UserContext } from "@/context/userContext";
import CutDiamond from "@/components/icons/CutDiamond";
import Person from "@/components/icons/ui/Person";
import Settings from "@/components/icons/ui/Settings";

const ProfileNavigation = ({
  user,
  updateUser,
  updateImage,
}: {
  user: User;
  updateUser: (user: any) => void;
  updateImage: (src: string) => void;
}) => {
  const profileTabs: Tab[] = [
    {
      icon: <Person />,
      name: "user",
      label: "Información de usuario",
      component: <UserInfo user={user} updateUser={updateUser} />,
    },
    {
      icon: <Settings />,
      name: "security",
      label: "Seguridad de la cuenta",
      component: <Security updateUser={updateUser} />,
    },
    { icon: <CutDiamond />, name: "subscription", label: "Suscripción", component: <Subscription user={user} /> },
  ];

  return (
    <div className={styles.profileContainer}>
      <Profile updateImage={updateImage} user={user} />
      <MultiTab tabs={profileTabs} />
    </div>
  );
};

export default ProfileNavigation;
