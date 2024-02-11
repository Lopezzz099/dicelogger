'use client';
import LinkButton from "@/components/common/buttons/Button";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {

  const router = useRouter()

  const [user, setUser] = useState('');

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (!user) {
      redirect('/landing');
    }
    setUser(user);
  }, []);


  const handleLogout = () => {
    window.localStorage.removeItem('user');
    router.push('/landing');
  }

  return (
    <main>
      <h2>Bienvenido {user}</h2>
      <p>Aquí va a estar el home</p>
      <LinkButton onClick={handleLogout}>Cerrar sesión</LinkButton>
    </main>
  );
}
