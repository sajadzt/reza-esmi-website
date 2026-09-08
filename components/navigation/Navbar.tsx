"use client";

import { useEffect, useState } from "react";
import Container from "../layout/Container";

const links = [
  { title: "Work", href: "#" },
  { title: "Services", href: "#" },
  { title: "About", href: "#" },
  { title: "Contact", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-24 items-center justify-between">

          <a
            href="/"
            className="text-lg font-semibold tracking-[0.35em]"
          >
            REZA&nbsp;ESMI
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-sm uppercase tracking-[0.18em] text-neutral-300 transition hover:text-white"
              >
                {link.title}
              </a>
            ))}
          </nav>

          <button className="flex h-10 w-10 items-center justify-center lg:hidden">
            ☰
          </button>

        </div>
      </Container>
    </header>
  );
}