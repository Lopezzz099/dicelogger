"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const session = cookies().get("Session")?.value;

export const removeCharacter = async (characterId: number) => {
  try {
    const response = await fetch(
      `${process.env.URL}/api/characters/${characterId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `Session=${session}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    revalidatePath("/characters");
  } catch (error: any) {
    console.error(error);
  }
};

// export const removeFriend = async (id: string) => {
//   try {
//     const res = await fetch(process.env.URL + `/api/friends/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Cookie': `Session=${session}`
//       }
//     })
//     const data = await res.json()
//     console.log(data)
//     revalidatePath('/friends')
//   } catch (error) {
//     console.error(error)
//   }
// }

// const [deleteOpen, setDeleteOpen] = useState(false);
// const [deleteLoading, setDeleteLoading] = useState(false);
// const [deleteError, setDeleteError] = useState(false);

// const handleDelete = async () => {
//   setDeleteLoading(true);
//   try {
//     const res = await fetch(
//       "/api/campaigns/" + campaignDetails?.campaign_id,
//       {
//         method: "DELETE",
//       }
//     );

//     if (res.ok) {
//       setDeleteError(false);
//       setDeleteOpen(false);
//       router.push("/campaigns");
//     } else {
//       throw new Error("Something went wrong");
//     }
//   } catch (error) {
//     setDeleteError(true);
//   } finally {
//     setDeleteLoading(false);
//   }
// };
