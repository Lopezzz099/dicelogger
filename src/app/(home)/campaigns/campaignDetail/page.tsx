"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ArrowLeft from "@/components/icons/ui/ArrowLeft";
import Link from "next/link";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Paper from "@/components/icons/ui/Paper";
import Button from "@/components/common/buttons/Button";
import Eliminate from "@/components/icons/ui/Eliminate";
import Edit from "@/components/icons/ui/Edit";
import NewLayout from "@/components/home/NewLayout/NewLayout";
import Carousel from "@/components/home/Carousel/Carousel";
import LayoutDetailCampaign from "@/components/home/LayoutDetailCampaign/LayoutDetailCampaign";
import ItemsImgCarousel from "./ItemsImgCarousel";
import PlayerCampaign from "@/components/home/PlayerCampaign/PlayerCampaign";
import ItemsPlayers from "./ItemsPlayers";
import Accordion from "@/components/sections/home/Accordion/Accordion";

interface CampaignDetails {
  img: string | StaticImport;
  title: string;
  description: string;
}

const CampaignDetail = () => {
  const [campaignDetails, setCampaignDetails] = useState<
    CampaignDetails | undefined
  >();

  useEffect(() => {
    const campaignDetailsString = localStorage.getItem("campaignDetails");

    if (campaignDetailsString) {
      const parsedDetails = JSON.parse(campaignDetailsString);
      setCampaignDetails(parsedDetails);
    }
  }, []);

  return (
    <>
      {campaignDetails && (
        <LayoutDetailCampaign
          title={campaignDetails?.title}
          slug={[
            { label: "Campañas", href: "/campaigns" },
            { label: campaignDetails?.title },
          ]}
        >
          <section className={styles.container}>
            <div>
              <div className={styles.tarjet}>
                <Image
                  src={campaignDetails.img as StaticImport}
                  alt={campaignDetails.title}
                  width={357}
                  height={252}
                  className={styles.imgTarjet}
                />
                <p className={styles.p}>
                  Comparte el enlace para que puedan unirse a tu partida:{" "}
                </p>
                <div className={styles.copy}>
                  <p>https://proyecto-dnd.vercel.app/Golin123</p>
                  <button>
                    <Paper size={20} color="white" className={styles.paper} />
                  </button>
                </div>
                <p className={styles.invite}>o invitar amigos</p>
                <Button className={styles.button}>Iniciar partida</Button>
              </div>
              <div className={styles.infoParty}>
                <div>
                  <p className={styles.create}>Creado por Jhon Doe</p>
                  <p className={styles.hours}>Horas jugadas: 14</p>
                  <p className={styles.lastSesion}>Última sesión: 28/02/2024</p>
                </div>
                <div className={styles.modify}>
                  <button className={styles.cargarImgaen}>
                    Cargar imágenes
                  </button>
                  <div className={styles.buttons}>
                    <button className={styles.buttonELiminateEdit}>
                      <Eliminate size={20} />
                    </button>
                    <button className={styles.buttonELiminateEdit}>
                      <Edit size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.otherDetails}>
              <div className={styles.carousel}>
                <Carousel itemsImg={ItemsImgCarousel} />
              </div>
              <div className={styles.players}>
                {ItemsPlayers.map((player, index) => (
                  <PlayerCampaign
                    key={index}
                    name={player.name}
                    rol={player.rol}
                    icon={player.icon}
                    characters={player.characters}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className={styles.description}>
              <h2 className={styles.titleDesciption}>{campaignDetails.title}</h2>
              <Accordion maxCharacters={100}>
                <p className={styles.textDescription}>{campaignDetails.description}</p>
              </Accordion>
          </section>
        </LayoutDetailCampaign>
      )}
    </>
  );
};

export default CampaignDetail;
