interface ButtonProps {
  children: React.ReactNode;
  href?: string;
}

export default function Button({
  children,
  href,
}: ButtonProps) {
  const classes =
    "inline-flex items-center justify-center rounded-full bg-[#BC3019] px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 hover:bg-[#d34730]";

  if (href) {
    return (
      <a href={href ?? "#"} className={classes}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}