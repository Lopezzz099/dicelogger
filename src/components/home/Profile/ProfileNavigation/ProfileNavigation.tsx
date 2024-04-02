"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./ProfileNavigation.module.css";
import MultiTab from "@/components/common/tabs/MultiTab";

import Security from "../AccSecurity/Security";
import Subscription from "../Subscription/Subscription";
import Profile from "../ProfileView/Profile";
import UserInfo from "../ProfileView/UserInfo";
import { User, UserContext } from "@/context/userContext";

const ProfileNavigation = ({
  user,
  updateUser,
}: {
  user: User;
  updateUser: (user: any) => void;
}) => {
  const profileTabs: Tab[] = [
    {
      name: "user",
      label: "Información de usuario",
      component: <UserInfo user={user} updateUser={updateUser} />,
    },
    {
      name: "security",
      label: "Seguridad de la cuenta",
      component: <Security updateUser={updateUser} />,
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
