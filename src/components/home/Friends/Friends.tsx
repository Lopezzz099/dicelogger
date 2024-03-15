"use client";

import { useEffect, useState } from "react";
import styles from './Friends.module.css'
import Input from "@/components/common/inputs/Input";
import PersonAdd from "@/components/icons/ui/PersonAdd";
import Link from "next/link";
import Person from "@/components/icons/ui/Person";
import Delete from "@/components/icons/ui/Delete";
import Search from "@/components/icons/ui/Search";
import FriendCard from "./FriendCard";

type FriendProps = {
  friends: Friend[];
}

const Friends = ({ friends }: FriendProps) => {
  const [search, setSearch] = useState('')
  const [searchedFriends, setSearchedFriends] = useState<Friend[]>([])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredFriends = friends.filter(friend => {
    return friend.displayname.toLowerCase().includes(search.toLowerCase()) || friend.username.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    if (!search) {
      setSearchedFriends([])
    }
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        fetch(`/api/friends?search=${search}`)
          .then(res => res.json())
          .then(data => {
            setSearchedFriends(data)
          })
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

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
        {filteredFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
        { search && searchedFriends.length > 0 && (
          searchedFriends.map((friend, index) => (
            <FriendCard key={index} friend={friend} />
          ))
        )}
      </section>
    </section>
  )
}

export default Friends