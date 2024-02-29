import React from "react";
import styles from "./page.module.css";
import NewCampaign from "@/components/sections/home/NewCampaign/NewCampaign";

const page = () => {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Crear campaña</h2>
      </div>
      <hr />
      <NewCampaign />
    </section>
  );
};

export default page;
