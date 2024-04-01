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

const getUserCampaignCharacter = async (userId: string, campaignId: number) => {

  const res = await fetch(process.env.BACKEND_URL + `/character/filter?campaignid=${campaignId}&userid=${userId}`);
  const data = await res.json()
  return data
}

const SessionPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserData(cookies);
  const session = await getSession(params.id);
  const userCharacter = await getUserCampaignCharacter(user.id, session.campaign_id);

  console.log(user);
  console.log(session);
  console.log(userCharacter);
  

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
