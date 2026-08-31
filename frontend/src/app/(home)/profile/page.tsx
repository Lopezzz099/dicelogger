import ProfileNavigation from "@/components/home/Profile/ProfileNavigation/ProfileNavigation";
import { auth } from "@/services/firebase";

import getUserData from "@/services/getUserData";
import { uploadFileToS3 } from "@/services/s3Upload";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import React from "react";

export const revalidate = 0;

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
      revalidatePath('/profile', "layout");
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const updateImage = async (src: string) => {
    "use server"
    try {
      console.log(src)
      const updatedInfo = { image: src };
      await updateUser(updatedInfo);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ProfileNavigation user={user} updateUser={updateUser} updateImage={updateImage} />
    </>
  );
};

export default Profile;
