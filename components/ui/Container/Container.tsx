import styles from "./Container.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}