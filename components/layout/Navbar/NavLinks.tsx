import styles from "./Navbar.module.scss";

export default function NavLinks() {
  return (
    <nav className={styles.nav}>
      <a href="/">Home</a>
      <a href="/projects">Projects</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}