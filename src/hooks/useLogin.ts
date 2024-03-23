import { useRouter } from "next/navigation";
import { useUser } from "./useUser";

export type LoginData = {
  email: string;
  password: string;
}

export default function useLogin() {
  const router = useRouter()
  const { handleUser } = useUser()

  const handleLogin = ({ email, password }: LoginData) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(async data => {
      window.localStorage.setItem('user', data.data.username)
      await handleUser()
      router.push('/')
    }).catch(err => console.error(err))
  }

  return handleLogin
}