import styles from "./Tag.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function Tag({
  children,
}: Props) {
  return (
    <span className={styles.tag}>
      {children}
    </span>
  );
}