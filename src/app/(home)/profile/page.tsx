import ProfileNavigation from "@/components/home/Profile/ProfileNavigation/ProfileNavigation";
import { auth } from "@/services/firebase";

import getUserData from "@/services/getUserData";

import { cookies } from "next/headers";
import React from "react";

const Profile = async () => {
  const user = await getUserData(cookies);

  const updateUser = async (updatedInfo: any) => {
    "use server";
    const session = cookies().get("Session")?.value;
    try {
      const res = await fetch(process.env.URL + `/api/updateProfile`, {
        method: "PATCH",
        headers: {
          Cookie: `Session=${session}`,
        },
        body: JSON.stringify(updatedInfo),
      });
      if (!res.ok) throw new Error("Error updating profile");
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <>
      <ProfileNavigation user={user} updateUser={updateUser} />
    </>
  );
};

export default Profile;
