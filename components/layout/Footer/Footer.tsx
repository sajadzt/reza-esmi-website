import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <h2>
        REZA ESMI
      </h2>

      <div className={styles.bottom}>

        <span>
          Architecture Studio
        </span>

        <span>
          © 2026
        </span>

      </div>

    </footer>
  );
}