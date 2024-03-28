import ProfileNavigation from "@/components/home/Profile/ProfileNavigation/ProfileNavigation";
import { UserProvider } from "@/context/userContext";
import React from "react";

const Profile = () => {
  return (
    <UserProvider>
      <ProfileNavigation />
    </UserProvider>
  );
};

export default Profile;
