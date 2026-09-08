import { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="py-40">
      <Container>{children}</Container>
    </section>
  );
}