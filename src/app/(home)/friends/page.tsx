import Friends from '@/components/home/Friends/Friends';
import { cookies } from 'next/headers';

const session = cookies().get("Session")?.value

const getFriends = async () => {
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
  const friends: Friend[] = await getFriends()
  return (
    <Friends cookie={`Session=${session}`} friends={friends} />
  )
}

export default FriendsPage