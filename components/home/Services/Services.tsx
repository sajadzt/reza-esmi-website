import ServiceItem from "./ServiceItem";
import styles from "./Services.module.scss";

const services = [
  {
    number: "01",
    title: "Industrial Architecture",
    description:
      "Factories, production facilities and industrial campuses designed for performance and efficiency.",
  },
  {
    number: "02",
    title: "Office Design",
    description:
      "Human-centered workplaces that improve collaboration, identity and productivity.",
  },
  {
    number: "03",
    title: "Interior Architecture",
    description:
      "Interior environments that balance aesthetics, function and user experience.",
  },
  {
    number: "04",
    title: "Construction Supervision",
    description:
      "Architectural supervision from concept through execution with attention to quality.",
  },
  {
    number: "05",
    title: "Architectural Consultancy",
    description:
      "Strategic consulting for industrial and commercial development projects.",
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.header}>
        <span>Services</span>

        <h2>
          Design driven by
          <br />
          experience.
        </h2>
      </div>

      <div className={styles.list}>
        {services.map((service) => (
          <ServiceItem key={service.number} {...service} />
        ))}
      </div>
    </section>
  );
}