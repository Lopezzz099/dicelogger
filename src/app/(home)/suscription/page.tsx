"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import itemsSuscription from "./itemsSuscription";
import Up from "@/components/icons/ui/Up";
import Down from "@/components/icons/ui/Down";
import Button from "@/components/common/buttons/Button";
import Image from "next/image";
import Close from "@/components/icons/ui/Close";
import Done from "@/components/icons/ui/Done";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Suscription = () => {
  const [expandedtexts, setExpandedtexts] = useState<Set<number>>(new Set());

  const toggleSessions = (index: number) => {
    setExpandedtexts((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  const [isMonthlyActive, setIsMonthlyActive] = useState(true);
  const [showProContent, setShowProContent] = useState(true); // Estado para controlar la visualización del contenido Pro

  const handleMonthlyClick = () => {
    setIsMonthlyActive(true);
    setShowProContent(true); // Mantener el contenido Pro visible al hacer clic en "Pagar mensualmente"
  };

  const handleAnnualClick = () => {
    setIsMonthlyActive(false);
    setShowProContent(false); // Ocultar el contenido Pro al hacer clic en "Pagar anualmente"
  };

  const listSuscriptionFree = [
    {
      id: 1,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Hasta 3 partidas simultáneas",
    },
    {
      id: 2,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Hasta 5 jugadores activos",
    },
    {
      id: 3,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Acceso a todos los manuales",
    },
    {
      id: 4,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Jugar con tus amigos",
    },
    {
      id: 5,
      icon: <Close size={"20px"} />,
      text: "Plantillas de personaje y campañas básicas",
    },
    {
      id: 6,
      icon: <Close size={"20px"} />,
      text: "Anuncios en la aplicación",
    },
    {
      id: 7,
      icon: <Close size={"20px"} />,
      text: "Sin acceso anticipado",
    },
  ];
  const listSuscriptionPro = [
    {
      id: 1,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Almacenamiento ilimitado",
    },
    {
      id: 2,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Alojamiento en línea dedicado",
    },
    {
      id: 3,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Acceso a todos los manuales",
    },
    {
      id: 4,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Jugar con tus amigos",
    },
    {
      id: 5,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Todas las plantillas de personaje y campañas",
    },
    {
      id: 6,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Sin anuncios",
    },
    {
      id: 7,
      icon: <Done size={"20px"} color="var(--secondary)" />,
      text: "Acceso anticipado",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUrl = async () => {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: isMonthlyActive ? "price_1OyIcyH3WKDkGdrdHGa1BIQn" : "price_1OyK9qH3WKDkGdrd64g0u2hJ",
          userId: "123"
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setUrl(data.url);
      } else {
        console.log("error");
      }
      setLoading(false);
    };

    getUrl();
  }, [isMonthlyActive]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status === "success") {
      toast.success("¡Gracias por suscribirte!", {
        style: {
          backgroundColor: "#1c1824",
          border: "2px solid #131017",
          fontSize: "0.9rem"
        },
        duration: 4000
      });
    }
  }, []);

  const handleClick = () => {
    if (url) {
      router.replace(url);
    }
  };

  return (
    <section className={styles.list}>
      <div className={styles.listContent}>
        <section className={styles.header}>
          <div className={styles.title}>
            <h2>Suscripción</h2>
          </div>
        </section>
        <hr />
        <section className={styles.container}>
          <div className={styles.suscriptionOptions}>
            <Button
              className={
                styles.button1 +
                (isMonthlyActive ? " " + styles.buttonActive : "")
              }
              onClick={handleMonthlyClick}
            >
              Pagar mensualmente
            </Button>
            <Button
              className={
                styles.button2 +
                (!isMonthlyActive ? " " + styles.buttonActive : "")
              }
              onClick={handleAnnualClick}
            >
              Pagar anualmente
            </Button>
          </div>
          <div className={styles.containerTarjet}>
            <div className={styles.tarjet}>
              <p className={styles.p}>Básica</p>
              <p className={styles.valor}>Gratis</p>
              <div className={styles.pro}>
                <hr />
                <Image
                  src={"/assets/home/suscription/free.png"}
                  alt={"freeImg"}
                  width={80}
                  height={80}
                />
                <hr />
              </div>
              {listSuscriptionFree.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.itemIcon}>{item.icon} </div>
                  <div>{item.text} </div>
                </div>
              ))}
            </div>
            <div className={styles.tarjet}>
              <div className={styles.proTitle}>
                <p className={styles.p}>Pro</p>
                {!isMonthlyActive && (
                  <p className={styles.pPro}>
                    $1.75<i>/mes</i>
                  </p>
                )}
              </div>
              <div className={styles.valuePro}>
                <p className={styles.valor}>
                  {isMonthlyActive ? (
                    <>
                      $3<i>/mes</i>
                    </>
                  ) : (
                    <>
                      $21<i>/año</i>
                    </>
                  )}
                </p>
                {isMonthlyActive ? (
                  ""
                ) : (
                  <p className={styles.valor2}>
                    $36<i>/año</i>
                  </p>
                )}
              </div>
              <div className={styles.pro}>
                <hr />
                <Image
                  src={"/assets/home/suscription/pro.png"}
                  alt={"proImg"}
                  width={80}
                  height={80}
                />
                <hr />
              </div>
              {listSuscriptionPro.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.itemIcon}>{item.icon} </div>
                  <div>{item.text} </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.suscribeButtons}>
            <Button>Regalar suscripción</Button>
            <Button onClick={handleClick} disabled={loading}>
              {loading ? "Cargando..." : "Suscribirse"}
            </Button>
          </div>
        </section>
        <hr />
        <section className={styles.faq}>
          <h3>Preguntas frecuentes</h3>
          <div className={styles.items}>
            {itemsSuscription.map((item, index) => {
              const isExpanded = expandedtexts.has(index);

              return (
                <div key={index}>
                  <div
                    className={styles.accordion}
                    onClick={() => toggleSessions(index)}
                  >
                    <p>{item.title}</p>
                    {isExpanded ? (
                      <Up color="white" size="1.25rem" />
                    ) : (
                      <Down color="white" size="1.25rem" />
                    )}
                  </div>
                  <div
                    className={
                      styles.notes + (isExpanded ? " " + styles.expanded : "")
                    }
                  >
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Suscription;
