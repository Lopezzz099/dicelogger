import { auth } from "@/services/firebase";
import { updateProfile } from "firebase/auth";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: NextApiResponse) {
  const body = await req.json();
  //   const { name, email, display_name } = body;
  console.log(body)
  try {
    const user = await updateUser(body);
    console.log(user)
    return NextResponse.json({
      message: "User updated successfully" + user,
      data: user,
    });
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

const updateUser = async (user: any) => {
  const cookie = cookies().get("Session")?.value;
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
      method: "PATCH",
      headers: {
        Cookie: `Session=${cookie}`,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
};

// import { NextApiResponse } from "next";
// import { cookies } from "next/headers";

// export default async function handler(req: any, res: NextApiResponse) {
//   if (req.method !== "PATCH") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const body = req.body;
//   const { name, email, display_name } = body;

//   try {
//     const user = await updateUser({ name, email, display_name }); // Pass the updatedInfo object directly
//     return res
//       .status(200)
//       .json({ message: "User updated successfully", data: user });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(400).json({ message: err.message });
//   }
// }

// const updateUser = async (updatedInfo: any) => {
//   const session = cookies().get("Session")?.value;
//   try {
//     const res = await fetch(`${process.env.URL}/user`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `Session=${session}`,
//       },
//       body: JSON.stringify(updatedInfo),
//     });
//     if (!res.ok) throw new Error("Error updating profile");
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
