"use client";

type Props = {
  open: boolean;
};

export default function MobileMenu({ open }: Props) {
  return (
    <div
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <a href="#">Projects</a>
      <a href="#">Services</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  );
}