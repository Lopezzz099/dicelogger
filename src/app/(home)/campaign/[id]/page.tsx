"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Paper from "@/components/icons/ui/Paper";
import Button from "@/components/common/buttons/Button";
import Eliminate from "@/components/icons/ui/Eliminate";
import Edit from "@/components/icons/ui/Edit";
import Carousel from "@/components/home/Carousel/Carousel";
import LayoutDetailCampaign from "@/components/home/LayoutDetailCampaign/LayoutDetailCampaign";
import PlayerCampaign from "@/components/home/Campaign/PlayerCampaign/PlayerCampaign";
import Accordion from "@/components/sections/home/Accordion/Accordion";
import GetAllCardsCharacters from "@/components/home/Campaign/GetAllCardsCharacters/GetAllCardsCharacters";
import Add from "@/components/icons/ui/Add";
import TextArea from "@/components/common/inputs/TextArea";
import Up from "@/components/icons/ui/Up";
import Down from "@/components/icons/ui/Down";
import MultiTab from "@/components/common/tabs/MultiTab";
import { CampaignReq } from "@/app/api/campaigns/route";
import { useRouter } from "next/navigation";
import Loading from "../../loading";

// interface CampaignDetails {
//   img: string | StaticImport;
//   title: string;
//   description: string;
// }

interface SessionDetails {
  date: string;
  startDate: string;
  finishDate: string;
  description: string;
}

// interface SessionsDetails {
//   sessions: SessionDetails[];
// }

// const getCharacters = async () => {
//   const data = {
//     characters: [],
//     info: "",
//   };
//   try {
//     const response = await fetch(process.env.URL + "/api/characters");
//     data.characters = await response.json();
//     data.info = "Success";
//   } catch (error: any) {
//     data.info = error.message;
//   }
//   return data;
// };

type CampaignUser = {
  id: string;
  name: string;
  email: string;
  displayName: string;
  image: string;
  character: null | CharacterCampaign;
};

export type CharacterCampaign = {
  character_id: string;
  user_id: string;
  campaign_id: string;
  name: string;
  image_url: string;
  race: string;
  class: string;
  level: number;
  hit_points: number;
};

export type CampaignDetails = {
  campaign_id: number;
  dungeon_master: string;
  name: string;
  description: string;
  image: string;
  notes: string | null;
  status: string | null;
  sessions: any[] | null;
  images: string | null;
  users: CampaignUser[];
};

type CampaignDetailProps = {
  params: {
    id: string;
  };
};

const CampaignDetail = ({ params }: CampaignDetailProps) => {
  // // TODO: type characters
  // const data = getCharacters();

  const router = useRouter()
  const [campaignDetails, setCampaignDetails] = useState<
    CampaignDetails | undefined
  >();
  const [characters, setCharacters] = useState<CharacterCampaign[] | null>(null);

  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(!show);
  };

  const [showNewNote, setShowNewNote] = useState(false);

  const handleClickNote = () => {
    setShowNewNote(!showNewNote);
  };

  const [notes, setNotes] = useState<string[]>([]);

  const [showNotes, setShowNotes] = useState(false);

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  useEffect(() => {
    const getCampaignDetail = async () => {
      const response = await fetch("/api/campaigns/" + params.id);
      const data: CampaignDetails = await response.json();
      setCampaignDetails(data)
      const newCharacters = data.users.map((user: any) => {
        if (user.character) {
          return user.character;
        }
      }).filter((character: any) => character !== undefined);
      
      setCharacters(newCharacters.length > 0 && newCharacters[0] !== undefined ? newCharacters : null);
      setNotes(data.notes?.split(",") || []);
    };

    getCampaignDetail();
  }, [params]);

  const [noteError, setNoteError] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setNoteLoading(true)
    e.preventDefault();
    const form = e.currentTarget;

    const inputElement = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const newNote = inputElement.value;

    if (!newNote || !campaignDetails) {
      return
    }

    const body: CampaignReq = {
      dungeonMaster: campaignDetails.dungeon_master,
      name: campaignDetails.name,
      description: campaignDetails.description,
      image: campaignDetails.image,
      notes: notes.join(",") + "," + newNote,
      status: campaignDetails.status,
      images: campaignDetails.images,
    }

    const response = await fetch("/api/campaigns/" + params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const data: CampaignReq = await response.json();
      console.log(data);
      

      if (!data.notes) {
        setNoteLoading(false)
        setNoteError(true)
        return
      }
      // Update the 'notes' state with the new note
      setNotes(data.notes.split(","));
  
      // Clear the input field after adding the note
      inputElement.value = "";
  
      handleClickNote();
      setNoteError(false)
    } else {
      console.log(response);
      setNoteError(true)
    }

    setNoteLoading(false)
  };

  // probando las agregaciones de sesiones (anda)

  const [showButtons, setShowButtons] = useState(true);
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(
    new Set()
  );
  const [sesions, setSesions] = useState<SessionDetails[]>([]);
  const [currentSession, setCurrentSession] = useState<Partial<SessionDetails>>(
    {}
  );

  const toggleSessions = (index: number) => {
    setExpandedSessions((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  const agregarFecha = (tipo: "inicio" | "fin") => {
    const fechaHoraActual = new Date();
    const fechaFormateada = fechaHoraActual.toISOString().split("T")[0];

    setCurrentSession((prevSession) => ({
      ...prevSession,
      date: fechaFormateada,
      [tipo === "inicio" ? "startDate" : "finishDate"]:
        fechaHoraActual.toLocaleString(),
    }));

    setShowButtons(!showButtons);

    if (tipo === "fin" && currentSession.startDate) {
      const nuevaSesion: SessionDetails = {
        date: fechaFormateada,
        startDate: currentSession.startDate as string,
        finishDate: fechaHoraActual.toLocaleString(),
        description: "Descripción de la sesión",
      };

      setSesions([...sesions, nuevaSesion]);
      setCurrentSession({});
    }
  };

  const campaignTabs: Tab[] = [
    {
      name: "characters",
      label: "Personajes",
      component: (
        <GetAllCardsCharacters
          characters={characters}
        />
      ),
    },
    // { name: "npcs", label: "NPCs", component: <GetAllCardsCharacters /> },
  ];

  // ------------------------------------

  return (
    <>
      {campaignDetails ? (
        <LayoutDetailCampaign
          title={campaignDetails?.name}
          slug={[
            { label: "Campañas", href: "/campaigns" },
            { label: campaignDetails?.name },
          ]}
        >
          <section className={styles.container}>
            <div className={styles.firstDetails}>
              <div className={styles.tarjet}>
                <div className={styles.imageContainer}>
                  <Image
                    src={campaignDetails.image}
                    alt={campaignDetails.name}
                    fill
                    className={styles.imgTarjet}
                  />
                </div>
                <div className={styles.tarjetContainer}>
                  <p className={styles.p}>Comparte el enlace de la campaña: </p>
                  <div className={styles.copy}>
                    <div className={styles.copyText}>
                      <p>{window.location.href}</p>
                    </div>
                    <button style={{ marginRight: "10px" }}>
                      <Paper size={20} color="white" className={styles.paper} />
                    </button>
                  </div>
                  <Button className={styles.invite}>Agregar amigos</Button>
                  {showButtons ? (
                    <Button
                      className={styles.button}
                      onClick={() => agregarFecha("inicio")}
                    >
                      Iniciar partida
                    </Button>
                  ) : (
                    <Button
                      className={styles.button}
                      onClick={() => agregarFecha("fin")}
                    >
                      Finalizar partida
                    </Button>
                  )}
                </div>
                <div className={styles.infoParty}>
                  <div className={styles.info}>
                    <p className={styles.create}>Creado por {campaignDetails.users.filter(u => u.id === campaignDetails.dungeon_master)[0].displayName}</p>
                    <p className={styles.hours}>Horas jugadas: 14</p>
                    <p className={styles.lastSesion}>Última sesión: 28/02/2024</p>
                  </div>
                  <div className={styles.modify}>
                    {/* <button className={styles.cargarImgaen}>
                      Cargar imágenes
                    </button> */}
                    <div className={styles.buttons}>
                      <button className={styles.buttonELiminateEdit}>
                        <Eliminate size={20} />
                      </button>
                      <button className={styles.buttonELiminateEdit} onClick={() => router.push("/campaigns/new/" + params.id)}>
                        <Edit size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.otherDetails}>
              {campaignDetails.images && (
                <div className={styles.carousel}>
                  <Carousel itemsImg={campaignDetails.images.split(",").map(image => ({ img: image }))} />
                </div>
              )}
              <div className={styles.players}>
                {campaignDetails && campaignDetails.users.map((user) => (
                  <PlayerCampaign
                    id={user.id}
                    key={user.id}
                    name={user.displayName}
                    rol={
                      campaignDetails.dungeon_master === user.id
                        ? "master"
                        : "jugador"
                    }
                    icon={user.image|| "/user.png"}
                    character={
                      user.character && {
                        name: user.character.name,
                        image: user.character.image_url,
                      }
                    }
                  />
                ))}
              </div>
            </div>
          </section>
          <section className={styles.description}>
            <h2 className={styles.titleDesciption}>{campaignDetails.name}</h2>
            <Accordion maxCharacters={100}>
              <p className={styles.textDescription}>
                {campaignDetails.description}
              </p>
            </Accordion>
          </section>
          <section className={styles.AllCharactersContainer}>
            <MultiTab tabs={campaignTabs} />
          </section>
          <section className={styles.notesContainer}>
            <div className={styles.title}>
              <h2 onClick={() => console.log(campaignDetails)}>Notas de la campaña</h2>
              <button onClick={handleClickNote} id="newNote">
                <Add color="#FFFFFF" />
              </button>
            </div>
            <hr />
            {showNewNote ? (
              <div>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <TextArea
                    name="description"
                    placeholder="Escribe aquí..."
                    required
                    disableResize
                    className={styles.textArea}
                  />
                  {noteError && <p className={styles.error}>Algo salio mal. Intenta de nuevo en otro momento</p>}
                  <Button type="submit" disabled={noteLoading}>{noteLoading ? "Cargando..." : "Agregar nueva Nota"}</Button>
                </form>
              </div>
            ) : (
              ""
            )}
            {notes.length > 0 ? (
              <div>
                <div
                  className={styles.accordion}
                  onClick={toggleNotes}
                  style={{
                    borderRadius: showNotes ? "5px 5px 0px 0px" : "5px",
                  }}
                >
                  <div>Notas</div>
                  <div style={{ display: "flex" }}>
                    {showNotes ? <Up size={20} /> : <Down size={20} />}
                  </div>
                </div>
                {showNotes && (
                  <div className={styles.notes}>
                    <hr style={{ margin: "inherit", marginBottom: "0.5rem" }} />
                    {notes.length == 1 ? (
                      <p>{notes[0]}</p>
                    ) : (
                      notes.map((nota, index) => {
                        return (
                          <div key={index}>
                            <p>{nota}</p>
                            <hr />
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.sinNotas}>
                <p>Agrega nuevas notas para tu campaña!</p>
              </div>
            )}
          </section>
          <section>
            <div className={styles.title}>
              <h2>Sesiones</h2>
            </div>
            <hr />
            {sesions.length === 0 ? (
              <div className={styles.sinSesiones}>
                <p>Inicia la partida para tener tu control de sesiones!</p>
              </div>
            ) : (
              sesions.map((sesion, index) => {
                const isExpanded = expandedSessions.has(index);

                return (
                  <div key={index}>
                    <div
                      className={styles.accordion}
                      onClick={() => toggleSessions(index)}
                      style={{
                        borderRadius: isExpanded ? "5px 5px 0px 0px" : "5px",
                      }}
                    >
                      <div>{sesion.date}</div>
                      <div style={{ display: "flex" }}>
                        {isExpanded ? <Up size={20} /> : <Down size={20} />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className={styles.notes}>
                        <hr
                          style={{ margin: "inherit", marginBottom: "0.5rem" }}
                        />
                        <p>Fecha de inicio: {sesion.startDate}</p>
                        <p
                          style={{
                            color: "var(--primary)",
                            marginBottom: "20px",
                          }}
                        >
                          Fecha de finalización: {sesion.finishDate}
                        </p>
                        <p>{sesion.description}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </section>
        </LayoutDetailCampaign>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CampaignDetail;
