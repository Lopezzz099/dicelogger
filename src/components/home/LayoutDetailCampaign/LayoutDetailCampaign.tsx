import styles from "./LayoutDetailCampaign.module.css";
import Link from "next/link";
import NewLayoutHeader from "../NewLayout/NewLayoutHeader";

export type Slug = {
  label: string;
  href?: string;
};

type LayoutDetailCampaignProps = {
  children: React.ReactNode;
  title: string;
  slug: Slug[];
};

const LayoutDetailCampaign = ({
  title,
  slug,
  children,
}: LayoutDetailCampaignProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <NewLayoutHeader title={title} slug={slug} />
        {children}
      </div>
    </section>
  );
};

export default LayoutDetailCampaign;
