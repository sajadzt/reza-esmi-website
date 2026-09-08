"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import styles from "./Navbar.module.scss";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    const onScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 80) {
        navRef.current.classList.add(styles.scrolled);
      } else {
        navRef.current.classList.remove(styles.scrolled);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={styles.navbar}
      >
        <Logo />

        <NavLinks />

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          MENU
        </button>
      </header>

      <MobileMenu open={menuOpen} />
    </>
  );
}