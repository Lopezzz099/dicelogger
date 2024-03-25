import { useRouter } from "next/navigation";

export type RecoverData = {
    email: string;
}

export const useRecover = () => {
    const router = useRouter()

    const recover = async ({ email}: RecoverData) => {
        const res = await fetch('/api/recoverPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        if (!res.ok) {
            throw new Error("Error al enviar el correo electrónico de recuperación");
        }
    }

    return recover
}