import React from "react";
import styles from "./Subscription.module.css";
import Button from "@/components/common/buttons/Button";
import Image from "next/image";
import Done from "@/components/icons/ui/Done";
import Link from "next/link";

const Subscription = () => {
  return (
    <div className={styles.subContainer}>
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
          <h2>Información de pago</h2>
          <div className={styles.infoSub}>
            <p>Miembro premium desde el 20 de Enero de 2024</p>
            <span>
              Tu próxima fecha de facturación es el 20 de marzo de 2024
            </span>
          </div>
          <div className={styles.infoCard}>
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
          </div>
          <Button className={styles.cancelBtn}>Cancelar suscripción</Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
