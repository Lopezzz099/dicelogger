import NewLayoutHeader from "@/components/home/NewLayout/NewLayoutHeader";
import Chat from "./Chat";
import styles from "./page.module.css";
import getUserData from "@/services/getUserData";
import { cookies } from "next/headers";

const getSession = async (sessionId: string) => {
  const res = await fetch(process.env.BACKEND_URL + `/session/${sessionId}`);
  const data = await res.json()
  return data
};

const getCampaignCharacters = async (campaignId: number) => {
  const res = await fetch(process.env.BACKEND_URL + `/character/filter?campaignid=${campaignId}`);
  const data = await res.json()

  return data
}

const getFullCharacter = async (characterId: number) => {
  try {    
    console.log(characterId);
    if (!characterId) {
      throw new Error("No id provided");
    }
    const res = await fetch(`${process.env.BACKEND_URL}/character/${characterId}`);
    if (res.ok) {
      const data = await res.json()
      return data
    } else throw new Error()
  } catch (error) {
    console.log(error)
    return []
  }
}

const SessionPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserData(cookies);
  const session = await getSession(params.id);
  const campaignCharacters: any[] = await getCampaignCharacters(session.campaign_id);
  console.log(JSON.stringify(campaignCharacters));
  
  const userCharacter = await getFullCharacter(campaignCharacters.find(c => c.user_id === user.id).character_id);
  

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <NewLayoutHeader
          title={"Golinjam"}
          slug={[
            { label: "Campañas", href: "/campaigns" },
            { label: "Sesión 1" },
          ]}
        />
        <Chat />
      </div>
    </section>
  );
};

export default SessionPage;
