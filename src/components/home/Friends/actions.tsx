"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const session = cookies().get("Session")?.value

export const addFriend = async (id: string) => {
  try {
    const res = await fetch(process.env.URL + `/api/friends/${id}`, {
      method: 'POST',
      headers: {
        'Cookie': `Session=${session}`
      }
    })
    const data = await res.json()
    console.log(data)
    revalidatePath('/friends')
  } catch (error) {
    console.error(error)
  }
}

export const removeFriend = async (id: string) => {
  try {
    const res = await fetch(process.env.URL + `/api/friends/${id}`, {
      method: 'DELETE',
      headers: {
        'Cookie': `Session=${session}`
      }
    })
    const data = await res.json()
    console.log(data)
    revalidatePath('/friends')
  } catch (error) {
    console.error(error)
  }
}