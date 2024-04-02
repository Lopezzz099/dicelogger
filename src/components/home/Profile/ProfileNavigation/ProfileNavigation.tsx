"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./ProfileNavigation.module.css";
import MultiTab from "@/components/common/tabs/MultiTab";

import Security from "../AccSecurity/Security";
import Subscription from "../Subscription/Subscription";
import Profile from "../ProfileView/Profile";
import UserInfo from "../ProfileView/UserInfo";
import { UserContext } from "@/context/userContext";

const ProfileNavigation = ({ user }: { user: User }) => {
  const profileTabs: Tab[] = [
    {
      name: "user",
      label: "Información de usuario",
      component: <UserInfo user={user} />,
    },
    {
      name: "security",
      label: "Seguridad de la cuenta",
      component: <Security />,
    },
    { name: "subscription", label: "Suscripción", component: <Subscription /> },
  ];

  return (
    <div className={styles.profileContainer}>
      <Profile user={user} />
      <MultiTab tabs={profileTabs} />
    </div>
  );
};

export default ProfileNavigation;
