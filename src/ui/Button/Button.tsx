import { PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface Props extends PropsWithChildren {
  handle: () => void;
  isActive?: boolean;
}

export const Button = ({ isActive, children, handle }: Props) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={handle}
    >
      {children}
    </button>
  );
};
