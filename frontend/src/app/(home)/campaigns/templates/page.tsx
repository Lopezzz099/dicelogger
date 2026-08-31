import styles from "./page.module.css";
import NewLayout from "@/components/home/NewLayout/NewLayout";
import React from "react";
import CampaignTemplatesList from "@/components/home/Campaign/CampaignTemplatesList/CampaignTemplatesList";
import ButtonLinkCreate from "@/components/common/buttons/ButtonLinkCreate";
import { campaignTemplates } from "./campaignTemplates";

// const getCampaignsTemplates = async () => {
//   const data = {
//     campaignsTemplates: [],
//     info: "",
//   };
//   try {
//     const response = await fetch(process.env.URL + "/api/campaignsTemplates");
//     data.campaignsTemplates = await response.json();
//     data.info = "Success";
//   } catch (error: any) {
//     data.info = error.message;
//   }
//   return data;
// };

const TemplateCampaign = async () => {
  const data = campaignTemplates;

  return (
    <NewLayout
      title="Crear campaña"
      slug={[
        { label: "Campañas", href: "/campaigns" },
        { label: "Plantillas" },
      ]}
    >
      <section className={styles.container}>
        <div>
          <h3 className={styles.h3}>Crear campaña</h3>
          <p className={styles.p}>
            Crea una campaña 100% personalizada desde cero.
          </p>
          <ButtonLinkCreate link="/campaigns/new" storage="campaignDetailsTemplate">Crea una campaña desde cero</ButtonLinkCreate>
          <div className={styles.separacion}>
            <hr />
            <p className={styles.O}>O</p>
            <hr />
          </div>
        </div>
        <div>
          <h3 className={styles.h3}>Plantillas</h3>
          <p className={styles.p}>
            Utiliza una de nuestras plantillas y crea tu campaña en segundos
          </p>
          <CampaignTemplatesList campaignsTemplates={campaignTemplates} />
        </div>
      </section>
    </NewLayout>
  );
};

export default TemplateCampaign;
