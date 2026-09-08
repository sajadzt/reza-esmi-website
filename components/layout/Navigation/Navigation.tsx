"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "./navigation";

import styles from "./Navigation.module.scss";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className={styles.navigation}>
      <div className={styles.container}>
        {/* Logo */}

        <Link href="/" className={styles.logo}>
          <Image
  src="/logo/logo-white.svg"
  alt="Reza Esmi Architecture"
  width={240}
  height={90}
  className={styles.logoImage}
  priority
/>

          <div className={styles.brand}>
            <span className={styles.name}>
              REZA ESMI
            </span>

            <span className={styles.subtitle}>
              Architecture Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className={styles.menu}>
          {navigation.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`${styles.link} ${
                  active ? styles.active : ""
                }`}
              >
                <span className={styles.dot}></span>

                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}

        <div className={styles.actions}>
          <button
            className={styles.language}
          >
            EN
          </button>

          <button
            className={styles.mobileButton}
          >
            MENU
          </button>
        </div>
      </div>
    </header>
  );
}