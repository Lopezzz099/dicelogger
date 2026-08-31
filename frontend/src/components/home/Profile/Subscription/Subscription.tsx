import React from "react";
import styles from "./Subscription.module.css";
import Button from "@/components/common/buttons/Button";
import Image from "next/image";
import Done from "@/components/icons/ui/Done";
import Link from "next/link";
import LinkButton from "@/components/common/buttons/LinkButton";

const Subscription = ({ user }: { user: User}) => {
  return (
    <div className={styles.subContainer}>
      { user.subscribed ? (
      <div className={styles.suscription}>
        <div className={styles.subCard}>
          <div className={styles.subLogo}>
            <div className={styles.image}>
              <Image
                src={"/assets/home/suscription/pro.png"}
                alt={"proImg"}
                width={100}
                height={100}
              />
            </div>
            <h4>PRO</h4>
          </div>
          <div className={styles.subFeatures}>
            <div className={styles.subFeatureOne}>
              <Done size={"20px"} />
              <p>Acceso total a personajes y campañas</p>
            </div>
            <div className={styles.subFeatureTwo}>
              <Done size={"20px"} />
              <p>Hojas de personajes personalizadas</p>
            </div>
            <div className={styles.subFeatureThree}>
              <Done size={"20px"} />
              <p>8 GB de espacio de almacenamiento</p>
            </div>
          </div>
          <div className={styles.subMore}>
            <Link href="/suscription">
              <p>Más información sobre tu plan</p>
            </Link>
          </div>
        </div>
        <div className={styles.infoPago}>
          <div className={styles.infoSub}>
            <h2>Información de pago</h2>
            <p>Miembro premium desde el { (new Date).toLocaleDateString('es-UY', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) }</p>
            <span>
              Tu próxima fecha de facturación es el { (new Date(user.subExpiration)).toLocaleDateString('es-UY', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) }
            </span>
          </div>
          {/* <div className={styles.infoCard}>
            <div className={styles.cardDetails}>
              <Image
                src={"/assets/home/profile/visa.png"}
                alt={"freeImg"}
                width={100}
                height={100}
              />
              <div>
                <p>Visa terminada en 2342</p>
                <p>Expira: 05/27</p>
              </div>
            </div>

            <button className={styles.updateBtn}>Actualizar</button>
          </div> */}
          <Button className={styles.cancelBtn}>Cancelar suscripción</Button>
        </div>
      </div>
      ): (
        <div className={styles.notSuscribed}>
          <h3>Aún no estás suscrito</h3>
          <p>Accede a todas las funciones de la plataforma con el plan PRO</p>
          <LinkButton href={'/suscription'}>Ver planes</LinkButton>
        </div>
      )}
    </div>
  );
};

export default Subscription;
