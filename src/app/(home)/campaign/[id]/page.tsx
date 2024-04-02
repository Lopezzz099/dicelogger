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
import Modal from "@/components/common/modal/Modal";
import { toast } from "sonner";
import MultiSelect from "@/components/common/inputs/MultiSelect";
import Select from "@/components/common/inputs/Select";
import SessionModal from "@/components/home/Campaign/CampaignDetail/SessionModal";
import { SessionReq } from "@/app/api/sessions/route";
import { Friend, Tab } from "@/types/global";

// interface CampaignDetails {
//   img: string | StaticImport;
//   title: string;
//   description: string;
// }

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

type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  subExpiration: string;
  subscribed: boolean;
};

// export interface SessionDetails {
//   session_id: number;
//   start: string;
//   end: string;
//   description: string;
//   campaign_id: number;
//   current_environment: string | null;
// }

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
  sessions: SessionReq[] | null;
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

  const router = useRouter();
  const [campaignDetails, setCampaignDetails] = useState<
    CampaignDetails | undefined
  >();
  const [characters, setCharacters] = useState<CharacterCampaign[] | null>(
    null
  );
  const [user, setUser] = useState<User>();

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
      setCampaignDetails(data);
      const newCharacters = data.users
        .map((user: any) => {
          if (user.character) {
            return user.character;
          }
        })
        .filter((character: any) => character !== undefined);

      setCharacters(
        newCharacters.length > 0 && newCharacters[0] !== undefined
          ? newCharacters
          : null
      );
      setNotes(data.notes?.split(",") || []);
      setSessions(data.sessions || []);

      if (data.sessions) {
        if (data.sessions.length > 0) {
          setCurrentSession(data.sessions.find(s => new Date(s.end!).getFullYear() === 0)); 
        }
      }

    };

    const getUser = async () => {
      const response = await fetch("/api/my");
      const data: User = await response.json();
      setUser(data);
    };

    getCampaignDetail();
    getUser();
  }, [params]);

  const [noteError, setNoteError] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setNoteLoading(true);
    e.preventDefault();
    const form = e.currentTarget;

    const inputElement = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const newNote = inputElement.value;

    if (!newNote || !campaignDetails) {
      return;
    }

    const body: CampaignReq = {
      dungeonMaster: campaignDetails.dungeon_master,
      name: campaignDetails.name,
      description: campaignDetails.description,
      image: campaignDetails.image,
      notes: notes.join(",") + "," + newNote,
      status: campaignDetails.status,
      images: campaignDetails.images,
    };

    const response = await fetch("/api/campaigns/" + params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data: CampaignReq = await response.json();
      console.log(data);

      if (!data.notes) {
        setNoteLoading(false);
        setNoteError(true);
        return;
      }
      // Update the 'notes' state with the new note
      setNotes(data.notes.split(","));

      // Clear the input field after adding the note
      inputElement.value = "";

      handleClickNote();
      setNoteError(false);
    } else {
      console.log(response);
      setNoteError(true);
    }

    setNoteLoading(false);
  };

  // probando las agregaciones de sesiones (anda)

  const [showButtons, setShowButtons] = useState(true);
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(
    new Set()
  );

  const getDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  const toggleSessions = (index: number) => {
    setExpandedSessions((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  // const agregarFecha = (tipo: "inicio" | "fin") => {
  //   const fechaHoraActual = new Date();
  //   const fechaFormateada = fechaHoraActual.toISOString().split("T")[0];

  //   setCurrentSession((prevSession) => ({
  //     ...prevSession,
  //     date: fechaFormateada,
  //     [tipo === "inicio" ? "startDate" : "finishDate"]:
  //       fechaHoraActual.toLocaleString(),
  //   }));

  //   setShowButtons(!showButtons);

  //   if (tipo === "fin" && currentSession.startDate) {
  //     const nuevaSesion: SessionDetails = {
  //       date: fechaFormateada,
  //       startDate: currentSession.startDate as string,
  //       finishDate: fechaHoraActual.toLocaleString(),
  //       description: "Descripción de la sesión",
  //     };

  //     setSesions([...sesions, nuevaSesion]);
  //     setCurrentSession({});
  //   }
  // };

  /*Delete */

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(
        "/api/campaigns/" + campaignDetails?.campaign_id,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setDeleteError(false);
        setDeleteOpen(false);
        router.push("/campaigns");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setDeleteError(true);
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  /*Friends */

  const [friendsOpen, setFriendsOpen] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [friendsError, setFriendsError] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const handleFriends = (value: string) => {
    if (selectedFriends.includes(value)) {
      setSelectedFriends(selectedFriends.filter((skill) => skill !== value));
    } else {
      setSelectedFriends([...selectedFriends, value]);
    }
  };

  const addFriends = async () => {
    setFriendsLoading(true);
    try {
      const res = await fetch("/api/campaigns/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIds: selectedFriends,
          campaign_id: params.id,
        }),
      });
      if (res.ok) {
        setFriendsError(false);
        setSelectedFriends([]);
        setFriendsOpen(false);
        router.refresh();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setFriendsError(true);
    } finally {
      setFriendsLoading(false);
    }
  };

  /*Character selection */
  const [userCharacters, setUserCharacters] = useState<CharacterCampaign[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [characterSelectionOpen, setCharacterSelectionOpen] = useState(false);
  const [characterSelectionLoading, setCharacterSelectionLoading] =
    useState(false);
  const [characterSelectionError, setCharacterSelectionError] = useState(false);

  useEffect(() => {
    if (!user) return;
    const getFriends = async () => {
      try {
        const res = await fetch(`/api/friends`);
        if (!res.ok) throw new Error("Error fetching friends");
        const friends: Friend[] = await res.json();
        setFriends(
          friends.filter(
            (f) => !campaignDetails?.users.some((u) => u.id === f.id)
          )
        );
      } catch (error) {
        console.error(error);
        setFriends([]);
      }
    };

    const getCharacters = async () => {
      try {
        const res = await fetch(`/api/characters/user`);
        if (!res.ok) throw new Error("Error fetching characters");
        const characters: CharacterCampaign[] = await res.json();
        setUserCharacters(characters || []);
      } catch (error) {
        console.error(error);
        setUserCharacters([]);
      }
    };

    getFriends();
    getCharacters();
  }, [user, campaignDetails?.users]);

  const addCharacter = async () => {
    setCharacterSelectionLoading(true);
    try {
      const res = await fetch("/api/campaigns/character", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaign_id: parseInt(params.id),
          character_id: parseInt(selectedCharacter),
        }),
      });
      if (res.ok) {
        setCharacterSelectionError(false);
        setSelectedCharacter("");
        setCharacterSelectionOpen(false);
        router.refresh();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setCharacterSelectionError(true);
    } finally {
      setCharacterSelectionLoading(false);
    }
  };

  const campaignTabs: Tab[] = [
    {
      name: "characters",
      label: "Personajes",
      component: (
        <GetAllCardsCharacters
          characters={characters}
          hasCharacter={
            campaignDetails && user
              ? campaignDetails.users
                  .filter((u) => u.id === user.id)[0]?.character !== null
              : false
          }
          addCharacter={() => {
            setCharacterSelectionOpen(true);
          }}
        />
      ),
    },
    // { name: "npcs", label: "NPCs", component: <GetAllCardsCharacters /> },
  ];

  /*Sesiones*/

  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [sessionsError, setSessionsError] = useState(false);
  const [sessions, setSessions] = useState<SessionReq[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionReq>();

  const startASession = (session: SessionReq) => {
    setCurrentSession(session);
    setSessions([...sessions, session]);
  };

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
                    <button
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Enlace copiado", {
                          style: {
                            backgroundColor: "#1c1824",
                            border: "2px solid #131017",
                            fontSize: "0.9rem",
                          },
                        });
                      }}
                    >
                      <Paper size={20} color="white" className={styles.paper} />
                    </button>
                  </div>
                  {user?.id === campaignDetails.dungeon_master && (
                    <Button
                      className={styles.invite}
                      onClick={() => setFriendsOpen(true)}
                    >
                      Agregar amigos
                    </Button>
                  )}
                  {!currentSession ? (
                    <Button
                      className={styles.button}
                      onClick={() => setSessionsOpen(true)}
                      disabled={user?.id !== campaignDetails.dungeon_master}
                    >
                      Iniciar partida
                    </Button>
                  ) : (
                    <Button
                      className={styles.button}
                      onClick={() => {
                        router.push("/session/" + currentSession.session_id)
                      }}
                      disabled={
                        !campaignDetails.users.some((u) => u.id === user?.id)
                      }
                    >
                      Unirse
                    </Button>
                  )}
                </div>
                <div className={styles.infoParty}>
                  <div className={styles.info}>
                    <p className={styles.create}>
                      Creado por{" "}
                      {
                        campaignDetails.users.filter(
                          (u) => u.id === campaignDetails.dungeon_master
                        )[0].displayName
                      }
                    </p>
                    <p className={styles.hours}>Horas jugadas: 14</p>
                    <p className={styles.lastSesion}>
                      Última sesión: 28/02/2024
                    </p>
                  </div>
                  {user?.id === campaignDetails.dungeon_master && (
                    <div className={styles.modify}>
                      {/* <button className={styles.cargarImgaen}>
                      Cargar imágenes
                    </button> */}
                      <div className={styles.buttons}>
                        <button
                          className={styles.buttonELiminateEdit}
                          onClick={() => setDeleteOpen(true)}
                        >
                          <Eliminate size={20} />
                        </button>
                        <button
                          className={styles.buttonELiminateEdit}
                          onClick={() =>
                            router.push("/campaigns/new/" + params.id)
                          }
                        >
                          <Edit size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.otherDetails}>
              {campaignDetails.images && (
                <div className={styles.carousel}>
                  <Carousel
                    itemsImg={campaignDetails.images
                      .split(",")
                      .map((image) => ({ img: image }))}
                  />
                </div>
              )}
              <div className={styles.players}>
                {campaignDetails &&
                  campaignDetails.users.map((user) => (
                    <PlayerCampaign
                      id={user.id}
                      key={user.id}
                      modalOpen={() => {
                        setCharacterSelectionOpen(true);
                      }}
                      name={user.displayName}
                      rol={
                        campaignDetails.dungeon_master === user.id
                          ? "master"
                          : "jugador"
                      }
                      icon={user.image || "/user.png"}
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
              <h2 onClick={() => console.log(campaignDetails)}>
                Notas de la campaña
              </h2>
              {user?.id === campaignDetails.dungeon_master && (
                <button onClick={handleClickNote} id="newNote">
                  <Add color="#FFFFFF" />
                </button>
              )}
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
                  {noteError && (
                    <p className={styles.error}>
                      Algo salio mal. Intenta de nuevo en otro momento
                    </p>
                  )}
                  <Button type="submit" disabled={noteLoading}>
                    {noteLoading ? "Cargando..." : "Agregar nueva Nota"}
                  </Button>
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
            {sessions.length === 0 ? (
              <div className={styles.sinSesiones}>
                <p>Inicia la partida para tener tu control de sesiones!</p>
              </div>
            ) : (
              sessions.map((session, index) => {
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
                      <div>Sesión {index + 1}</div>
                      <div style={{ display: "flex" }}>
                        {isExpanded ? <Up size={20} /> : <Down size={20} />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className={styles.sessions}>
                        <hr
                          style={{ margin: "inherit", marginBottom: "0.5rem" }}
                        />
                        <p>Fecha de inicio: {getDate(session.start)}</p>
                        <p
                          style={{
                            color: "var(--primary)",
                          }}
                        >
                          {session.end &&
                          new Date(session.end).getFullYear() !== 0
                            ? `Fecha de finalización: ${getDate(session.end)}`
                            : "Sesión en progreso"}
                        </p>
                        <div className={styles.sessionBtns}>
                          {currentSession?.session_id === session.session_id && <Button onClick={() => { router.push("/session" + session.session_id) }}>Unirse</Button>}
                          <Button>Obtener reporte</Button>
                        </div>
                        <p>{session.description}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </section>
          <Modal
            onClose={() => {
              setDeleteError(false);
              setDeleteOpen(false);
            }}
            open={deleteOpen}
          >
            <div className={styles.modalDelete}>
              <strong>
                ¿Estas seguro de que quieres eliminar esta campaña?
              </strong>
              <p>No habra vuelta atrás</p>
              {deleteError && (
                <p className={styles.error}>
                  Algo salio mal. Intenta de nuevo en otro momento
                </p>
              )}
              <Button onClick={() => handleDelete()} disabled={deleteLoading}>
                {deleteLoading ? "Cargando..." : "Eliminar"}
              </Button>
            </div>
          </Modal>
          <Modal
            onClose={() => {
              setSelectedFriends([]);
              setFriendsError(false);
              setFriendsOpen(false);
            }}
            open={friendsOpen}
          >
            <div className={styles.modalFriends}>
              <label htmlFor="friends">Amigos</label>
              <MultiSelect
                placeholder="Selecciona amigos"
                onChange={handleFriends}
                selectedOptions={selectedFriends}
                options={friends.map((friend) => ({
                  value: friend.id,
                  label: friend.displayname,
                }))}
                className={styles.friendsSelect}
              />
              {friendsError && (
                <p className={styles.error}>
                  Algo salio mal. Intenta de nuevo en otro momento
                </p>
              )}
              <Button onClick={() => addFriends()} disabled={friendsLoading}>
                {friendsLoading ? "Cargando..." : "Agregar amigos"}
              </Button>
            </div>
          </Modal>
          <Modal
            onClose={() => {
              setSelectedCharacter("");
              setCharacterSelectionError(false);
              setCharacterSelectionOpen(false);
            }}
            open={characterSelectionOpen}
          >
            <div className={styles.modalFriends}>
              {userCharacters.length > 0 ? (
                <>
                  <label htmlFor="characters">Personajes</label>
                  <Select
                    placeholder="Selecciona un personaje"
                    onChange={(value) => {
                      setSelectedCharacter(value);
                    }}
                    value={selectedCharacter}
                    options={userCharacters.map((character) => ({
                      value: character.character_id,
                      label: character.name,
                    }))}
                    className={styles.friendsSelect}
                  />
                  {characterSelectionError && (
                    <p className={styles.error}>
                      Algo salio mal. Intenta de nuevo en otro momento
                    </p>
                  )}
                  <Button
                    onClick={() => addCharacter()}
                    disabled={characterSelectionLoading}
                  >
                    {characterSelectionLoading
                      ? "Cargando..."
                      : "Agregar personaje"}
                  </Button>
                </>
              ) : (
                <>
                  <strong>No tienes personajes</strong>
                  <Button onClick={() => router.push("/characters/templates")}>Crear personaje</Button>
                </>
              )}
            </div>
          </Modal>
          <Modal
            onClose={() => {
              setSessionsError(false);
              setSessionsOpen(false);
            }}
            open={sessionsOpen}
          >
            <SessionModal
              campaignId={parseInt(params.id)}
              error={sessionsError}
              handleError={(value: boolean) => {
                setSessionsError(value);
              }}
              addSession={startASession}
            />
          </Modal>
        </LayoutDetailCampaign>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CampaignDetail;
