import Friends from '@/components/home/Friends/Friends';

const getFriends = async () => {
  try {
    const res = await fetch(process.env.URL + `/api/friends`)
    if (!res.ok) throw new Error('Error fetching friends')
    const f: Friend[] = await res.json()
    return f
  } catch (error) {
    console.error(error)
    return []
  }
}

const FriendsPage = async () => {
  const friends: Friend[] = await getFriends()
  return (
    <Friends friends={friends} />
  )
}

export default FriendsPage