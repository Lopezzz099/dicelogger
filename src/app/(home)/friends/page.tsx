"use client";

import Delete from '@/components/icons/ui/Delete'
import styles from './Friends.module.css'
import Person from '@/components/icons/ui/Person'
import Input from '@/components/common/inputs/Input'
import Search from '@/components/icons/ui/Search'
import { useState } from 'react';
import PersonAdd from '@/components/icons/ui/PersonAdd';
import Link from 'next/link';

const friends = [
  {
    id: 1,
    displayname: 'Juancho',
    username: 'juancho123',
    avatar: "https://randomuser.me/api/portraits/thumb/men/6.jpg",
    friend: true,
  },
  {
    id: 2,
    displayname: 'Maria Perez',
    username: 'maria123',
    avatar: "https://randomuser.me/api/portraits/thumb/women/6.jpg",
    friend: true,
  },
  {
    id: 3,
    displayname: 'Pedrito11',
    username: 'pedrito11',
    avatar: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
    friend: true,
  },
  {
    id: 4,
    displayname: 'Pepita',
    username: 'pepita123',
    avatar: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
    friend: true,
  },
  {
    id: 5,
    displayname: 'Ejemplo no-amigo',
    username: 'ejemplo123',
    avatar: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
    friend: false,
  },
]

const Friends = () => {

  const [search, setSearch] = useState('')
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <section className={styles.list}>
      <section className={styles.header}>
        <div className={styles.title}>
          <h2>Amigos</h2>
        </div>
      </section>
      <hr />
      <Input className={styles.search} placeholder="Buscar" value={search} onChange={handleSearch}><Search /></Input>
      <section className={styles.friends}>
        {friends.map((friend, index) => (
          <div key={index} className={styles.friend}>
            <div className={styles.friendInfo}>
              <img src={friend.avatar} alt={`${friend.displayname}`} />
              <div>
                <h3>{friend.displayname}</h3>
                <p>{friend.username}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              {friend.friend ? (
                <>
                  <Link href={`/profile/${friend.id}`} className={styles.button}><Person /></Link>
                  <button className={`${styles.button} ${styles.delete}`}><Delete /></button>
                </>
              ) : (
                <button className={styles.button}><PersonAdd /></button>
              )}
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default Friends