import ProfileNavigation from "@/components/home/Profile/ProfileNavigation/ProfileNavigation";
import getUserData from "@/services/getUserData";
import { cookies } from "next/headers";
import React from "react";

const Profile = async () => {
  const user = await getUserData(cookies);

  return <ProfileNavigation user={user} />;
};

export default Profile;
