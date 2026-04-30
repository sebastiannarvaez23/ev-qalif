import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`btn btn--${variant}${className ? ` ${className}` : ""}`}
    >
      {children}
    </button>
  );
}
