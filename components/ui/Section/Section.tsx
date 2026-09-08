import styles from "./Section.module.scss";

type Props = {
  children: React.ReactNode;
  dark?: boolean;
};

export default function Section({
  children,
  dark,
}: Props) {
  return (
    <section
      className={`${styles.section} ${dark ? styles.dark : ""}`}
    >
      {children}
    </section>
  );
}