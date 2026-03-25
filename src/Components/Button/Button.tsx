import type { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: ReactNode;
  isActive?: boolean;
}

function Button({ variant, children, isActive }: ButtonProps) {
  const classActive = isActive ? "active" : "";
  return (
    <button className={`${styles[variant]} ${styles[classActive]}`}>
      {children}
    </button>
  );
}

export default Button;