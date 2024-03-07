import { useRouter } from "next/navigation";

export type SignupData = {
  username: string;
  displayname: string;
  email: string;
  password: string;
}

export default function useSignup() {
  const router = useRouter()

  const handleSignup = ({ username, displayname, email, password }: SignupData) => {
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, displayname, email, password })
    }).then(res => res.json()).then(data => {
      window.localStorage.setItem('user', data.data.username)
      router.push('/')
    }).catch(err => console.error(err))
  }

  return handleSignup
}