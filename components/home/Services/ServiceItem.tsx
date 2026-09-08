"use client";

import Link from "next/link";
import styles from "./ServiceItem.module.scss";

type Props = {
  number: string;
  title: string;
  description: string;
};

export default function ServiceItem({
  number,
  title,
  description,
}: Props) {
  return (
    <article className={styles.item}>
      <span className={styles.number}>
        {number}
      </span>

      <div className={styles.main}>
        <h3>{title}</h3>

        <p>{description}</p>
      </div>

      <Link
        href="/contact"
        className={styles.button}
      >
        <span>Discuss this service</span>
        <span className={styles.arrow}>↗</span>
      </Link>
    </article>
  );
}