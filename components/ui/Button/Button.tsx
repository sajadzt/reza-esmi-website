"use client";

import Link from "next/link";
import styles from "./Button.module.scss";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "text";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: Props) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        <span>{children}</span>

        <div className={styles.line} />

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M13 6L19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </Link>
    );
  }

  return (
    <button className={className}>
      <span>{children}</span>

      <div className={styles.line} />

      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M13 6L19 12L13 18"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}