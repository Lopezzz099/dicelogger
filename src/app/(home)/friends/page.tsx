import Friends from '@/components/home/Friends/Friends';
import { cookies } from 'next/headers';


const getFriends = async () => {
  const session = cookies().get("Session")?.value
  try {
    const res = await fetch(process.env.URL + `/api/friends`, {
      headers: {
        'Cookie': `Session=${session}`
      }
    })
    if (!res.ok) throw new Error('Error fetching friends')
    const f: Friend[] = await res.json()
    return f
  } catch (error) {
    console.error(error)
    return []
  }
}

export const revalidate = 0

const FriendsPage = async () => {
  const session = cookies().get("Session")?.value
  const friends: Friend[] = await getFriends()
  return (
    <Friends cookie={`Session=${session}`} friends={friends} />
  )
}

export default FriendsPage