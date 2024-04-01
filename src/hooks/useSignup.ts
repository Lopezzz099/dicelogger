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
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to sign up');
      }
    }).then(data => {
      // Check if verification email has been sent
      if (data && data.message === 'Verification email sent. Please check your email to complete registration.') {
        // Show a message to the user indicating that a verification email has been sent
        console.log('Se ha enviado un correo electrónico de verificación. Por favor, verifica tu correo electrónico para completar el registro.');
      }
      // Redirect to login page
      router.push('/auth/login');
    }).catch(err => console.error(err));
  }

  return handleSignup
}