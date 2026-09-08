import TeamShowcase from "@/components/ui/team-showcase";
import styles from "./about.module.scss";

const teamMembers = [
  {
    id: "reza-esmi",
    name: "Reza Esmi",
    role: "Founder / Architect",
    image: "/images/team/reza-esmi.jpg",
  },
  {
    id: "sajjad-zaker-tavallaei",
    name: "Sajjad Zaker Tavallaei",
    role: "Architect",
    image: "/images/team/architect-02.jpg",
  },
  {
    id: "mostafa-farzam",
    name: "Mostafa Farzam",
    role: "Conceptual Architect",
    image: "/images/team/architect-03.jpg",
  },
  {
    id: "armin-sepanloo",
    name: "Armin Sepanloo",
    role: "Technical Architect",
    image: "/images/team/architect-04.jpg",
  },
  {
    id: "mahsa-amini",
    name: "Mahsa Amini",
    role: "Architect",
    image: "/images/team/architect-05.jpg",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>

      {/* =========================================================
          PART 01 — INTRODUCTION
      ========================================================= */}

      <section className={styles.section}>
        <div className={styles.sectionNumber}>01 — The Practice</div>

        <div className={styles.introGrid}>
          <div>
            <p className={styles.eyebrow}>
              Reza Esmi Architecture
            </p>

            <h1 className={styles.heroTitle}>
              Building beyond
              <br />
              concrete.
            </h1>
          </div>

          <div className={styles.introText}>
            <p>
              Reza Esmi Architecture is an architectural practice focused on
              industrial facilities, workplaces, offices and environments
              where architecture has to perform as much as it has to
              communicate.
            </p>

            <p>
              For more than two decades, our work has developed around a
              simple belief: architecture should not be separated from the
              people who inhabit it, build it and experience it every day.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================
          PART 02 — PHILOSOPHY
      ========================================================= */}

      <section className={styles.section}>
        <div className={styles.sectionNumber}>02 — Philosophy</div>

        <div className={styles.largeStatement}>
          <span>Where industrial rigor</span>
          <span className={styles.muted}>meets human spirit.</span>
        </div>

        <div className={styles.twoColumnText}>
          <div>
            <p className={styles.smallLabel}>
              The way we think
            </p>
          </div>

          <div>
            <p>
              Our practice grew from working directly with the realities of
              industry: factories, production facilities, headquarters,
              offices and complex sites where every architectural decision
              has consequences for people and performance.
            </p>

            <p>
              Over the years, this experience has shaped an approach that
              combines architectural thinking with technical understanding.
              We work from the earliest stages of a project through design
              development, construction documentation and architectural
              support during implementation.
            </p>

            <p>
              The result is architecture that is grounded in reality without
              becoming ordinary — buildings that respond to production,
              climate, movement, people and long-term use while maintaining
              a strong architectural identity.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================
          PART 03 — HUMAN EXPERIENCE / VALUES
      ========================================================= */}

      <section className={styles.section}>
        <div className={styles.sectionNumber}>03 — Human Experience</div>

        <div className={styles.statementBlock}>
          <p className={styles.smallLabel}>
            Our belief
          </p>

          <h2>
            We design places
            <br />
            <span>for people first.</span>
          </h2>

          <p>
            Architecture is not only about form. It is about how people move,
            work, rest, collaborate, concentrate and feel inside a space.
          </p>

          <p>
            This is why our projects are developed around human experience
            as much as technical performance. Daylight, proportion,
            circulation, material, landscape, thermal comfort and visual
            relationships all become part of the architectural language.
          </p>
        </div>

        <div className={styles.valuesGrid}>
          <article>
            <span>01</span>
            <h3>Human Experience</h3>
            <p>
              Spaces designed around dignity, wellbeing and the everyday
              experience of their users.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Performance</h3>
            <p>
              Architecture developed together with technical, operational
              and environmental requirements.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Identity</h3>
            <p>
              Buildings that communicate the identity of the organizations
              and people who inhabit them.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Sustainability</h3>
            <p>
              Long-term thinking that considers climate, resources,
              efficiency and the future life of every building.
            </p>
          </article>
        </div>
      </section>


      {/* =========================================================
          PART 04 — APPROACH
      ========================================================= */}

      <section className={styles.section}>
        <div className={styles.sectionNumber}>04 — Approach</div>

        <div className={styles.approachHeader}>
          <div>
            <p className={styles.smallLabel}>
              From concept
            </p>

            <h2>
              to reality.
            </h2>
          </div>

          <p>
            We approach every project as a continuous architectural process
            rather than a collection of disconnected drawings.
          </p>
        </div>

        <div className={styles.process}>
          <article>
            <span>Phase 01</span>
            <h3>Research & Concept</h3>
            <p>
              Understanding the site, organization, users, constraints and
              opportunities before defining the architectural idea.
            </p>
          </article>

          <article>
            <span>Phase 02</span>
            <h3>Design Development</h3>
            <p>
              Transforming the initial concept into a coordinated
              architectural and technical solution.
            </p>
          </article>

          <article>
            <span>Phase 03</span>
            <h3>Documentation & Construction</h3>
            <p>
              Developing the information required to turn the architectural
              vision into a built environment.
            </p>
          </article>

          <article>
            <span>Phase 04</span>
            <h3>Beyond Completion</h3>
            <p>
              Architecture continues to perform after construction.
              Understanding how buildings are used allows us to keep
              improving the relationship between people and place.
            </p>
          </article>
        </div>
      </section>


      {/* =========================================================
          TEAM — FINAL SECTION
      ========================================================= */}

      <section className={`${styles.section} ${styles.teamSection}`}>
        <div className={styles.sectionNumber}>
          The People Behind The Work
        </div>

        <div className={styles.teamIntro}>
          <div>
            <p className={styles.smallLabel}>
              The team
            </p>

            <h2>
              Architecture is a
              <br />
              collective act.
            </h2>
          </div>

          <p>
            Our work is shaped by a multidisciplinary team of architects,
            designers and collaborators who share a common belief: that
            architecture should serve people before anything else.
          </p>
        </div>

        <div className={styles.teamWrapper}>
          <TeamShowcase members={teamMembers} />
        </div>
      </section>

    </main>
  );
}