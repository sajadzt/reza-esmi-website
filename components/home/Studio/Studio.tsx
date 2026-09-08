import Stat from "./Stat";
import styles from "./Studio.module.scss";

export default function Studio() {
  return (
    <section className={styles.studio} id="studio">
      <div className={styles.left}>
        <span className={styles.label}>
          Studio
        </span>

        <h2>
          Building Beyond
          Concrete.
        </h2>

        <p>
          Since 2006, Reza Esmi Architecture has
          delivered industrial facilities, office
          buildings and architectural consulting
          with a focus on human experience,
          productivity and long-term value.
        </p>
      </div>

      <div className={styles.right}>
        <Stat
          number="20+"
          title="Years"
        />

        <Stat
          number="50+"
          title="Projects"
        />

        <Stat
          number="2006"
          title="Founded"
        />

        <Stat
          number="Mashhad"
          title="Iran"
        />
      </div>
    </section>
  );
}