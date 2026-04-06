import type { ReactNode } from "react";
import styles from "./chip.module.css";

type ChipProps = {
  variant: "primary" | "secondary";
  isActive?: boolean;
  label?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
};

function Chip({ variant, isActive, label, children, onClick }: ChipProps) {
  const classActive = isActive ? "active" : "";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${styles[variant]} ${styles[classActive]}`}
    >
      {label} {children}
    </button>
  );
}

export default Chip;
