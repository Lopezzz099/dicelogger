"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ArrowLeft from "@/components/icons/ui/ArrowLeft";
import Link from "next/link";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Paper from "@/components/icons/ui/Paper";
import Button from "@/components/common/buttons/Button";

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
    <section className={styles.container}>
      <div className={styles.title}>
        <Link
          href={`/campaigns`}
          style={{ display: "flex", marginRight: "20px" }}
        >
          <ArrowLeft size="24px" color="white" />
        </Link>
        <h2>{campaignDetails?.title}</h2>
      </div>
      <hr />
      {campaignDetails && (
        <div >
          <div >
            <div className={styles.tarjet}>
              <Image
                src={campaignDetails.img as StaticImport}
                alt={campaignDetails.title}
                width={357}
                height={252}
              />
              <p className={styles.p} >Comparte el enlace para que puedan unirse a tu partida: </p>
              <div className={styles.copy}>
                <p>https://proyecto-dnd.vercel.app/Golin123</p>
                <button>
                  <Paper size={20} color="white" className={styles.paper}/>
                </button>
              </div>
              <p className={styles.invite} >o invitar amigos</p>
              <Button className={styles.button}>Iniciar partida</Button>
            </div>
            <div className={styles.infoParty}>
              <div>
                <p className={styles.create}>Creado por Jhon Doe</p>
                <p className={styles.hours}>Horas jugadas: 14</p>
                <p className={styles.lastSesion}>Última sesión: 28/02/2024</p>
              </div>
              <div>
                <button>Cargar imágenes</button>
                <div>
                  <button></button>
                  <button></button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.otherDetails}>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CampaignDetail;
