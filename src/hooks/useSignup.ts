import { useRouter } from "next/navigation";
import { useUser } from "./useUser";

export type SignupData = {
  username: string;
  displayname: string;
  email: string;
  password: string;
}

export default function useSignup() {
  const router = useRouter()
  const { handleUser } = useUser()

  const handleSignup =  ({ username, displayname, email, password }: SignupData) => {
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, displayname, email, password })
    }).then(res => res.json()).then(async data => {
      window.localStorage.setItem('user', data.data.username)
      await handleUser()
      router.push('/')
    }).catch(err => console.error(err))
  }

  return handleSignup
}