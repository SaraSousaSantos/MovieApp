import type { ReactNode } from "react";
import styles from "./chip.module.css";

type ChipProps = {
  label?: ReactNode;
  variant?: "primary" | "secondary";
  children?: ReactNode;
};

function Chip({ label, variant = "primary",children, }: ChipProps) {
  return <span className={`${styles.chip} ${styles[variant]}`}>{label} {children}</span>;
}

export default Chip;