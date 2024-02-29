import React from "react";
import styles from "./page.module.css";
import NewCampaign from "@/components/sections/home/NewCampaign/NewCampaign";

const page = () => {
  return (
    <section>
      <section className={styles.header}>
        <div className={styles.title}>
          <h2>Crear campaña</h2>
        </div>
      </section>
      <hr />
      <NewCampaign/>
    </section>
  );
};

export default page;
