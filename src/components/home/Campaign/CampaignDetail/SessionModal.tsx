"use client";
import React, { useState } from "react";
import FormGroup from "../../NewLayout/FormGroup";
import TextArea from "@/components/common/inputs/TextArea";
import Input from "@/components/common/inputs/Input";
import styles from "./SessionModal.module.css";
import formStyles from "@/components/home/NewLayout/Extra.module.css";
import Button from "@/components/common/buttons/Button";
import { SessionReq } from "@/app/api/sessions/route";
import { useRouter } from "next/navigation";

type SessionModalProps = {
  campaignId: number;
  error: boolean
  handleError: (value: boolean) => void
  addSession: (session: SessionReq) => void
}

const SessionModal = ({ campaignId, error, handleError, addSession } : SessionModalProps) => {
  const router = useRouter()

  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionDescription, setSessionDescription] = useState<string>();
  const [sessionEnvironment, setSessionEnvironment] = useState("");

  const startSession = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sessionDescription) {
      handleError(true);
      return;
    }

    setSessionsLoading(true);

    const session: SessionReq = {
      description: sessionDescription,
      campaign_id: campaignId,
      current_enviroment: sessionEnvironment,
      start: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      })

      if (!res.ok) {
        throw new Error("Error creating session")
      }

      const data: SessionReq = await res.json();
      console.log(data);
      
      addSession(data)
      handleError(false)
      router.push("/session/" + data.session_id)
    } catch (error) {
      console.log(error);
      handleError(true)
    } finally {
      setSessionsLoading(false);
    }
  };

  return (
    <form className={styles.modalSession} onSubmit={startSession}>
      <FormGroup className={styles.sessionFormGroup}>
        <label htmlFor="description" className={formStyles.requiredLabel}>
          Descripción
        </label>
        <TextArea
          required
          placeholder="Escribe aquí..."
          value={sessionDescription}
          onChange={(e) => setSessionDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup className={styles.sessionFormGroup}>
        <label htmlFor="environment">Escenario</label>
        <Input
          placeholder="Escribe aquí..."
          value={sessionEnvironment}
          onChange={(e) => setSessionEnvironment(e.target.value)}
        />
      </FormGroup>
      {error && (
        <p className={styles.error}>
          Algo salio mal. Intenta de nuevo en otro momento
        </p>
      )}
      <Button type="submit" disabled={sessionsLoading}>
        {sessionsLoading ? "Iniciando..." : "Iniciar partida"}
      </Button>
    </form>
  );
};

export default SessionModal;
