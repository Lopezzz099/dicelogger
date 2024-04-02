import Link from 'next/link';
import styles from './Friends.module.css'
import Delete from '@/components/icons/ui/Delete';
import Person from '@/components/icons/ui/Person';
import PersonAdd from '@/components/icons/ui/PersonAdd';
import { addFriend, removeFriend } from './actions';

type FriendCardProps = {
  friend: Friend;
  handleAddFriend: (id: string) => void;
  handleRemoveFriend: (id: string) => void;
}

const FriendCard = ({ friend, handleAddFriend, handleRemoveFriend }: FriendCardProps) => {
  return (
    <div className={styles.friend}>
      <div className={styles.friendInfo}>
        <img src={friend.avatar} alt={`${friend.displayname}`} />
        <div>
          <span className={styles.infoHeader}>
            <h3>{friend.displayname}</h3>
            { friend.following && friend.followsYou && <p className={styles.mutual}>Mutuo</p>}
          </span>
          <p>{friend.username}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        {friend.following ? (
          <>
            {/* <Link href={`/profile/${friend.id}`} className={styles.button}><Person /></Link> */}
            <button onClick={() => handleRemoveFriend(friend.id)} className={`${styles.button} ${styles.delete}`}><Delete /></button>
          </>
        ) : (
          <button onClick={() => handleAddFriend(friend.id)} className={styles.button}><PersonAdd /></button>
        )}
      </div>
    </div>
  )
}

export default FriendCard