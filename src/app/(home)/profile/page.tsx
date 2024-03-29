import ProfileNavigation from "@/components/home/Profile/ProfileNavigation/ProfileNavigation";
import getUserData from "@/services/getUserData";
import { headers } from "next/headers";
import React from "react";

const Profile = async () => {

  const user = await getUserData(headers)

  return <ProfileNavigation user={user} />;
};

export default Profile;
