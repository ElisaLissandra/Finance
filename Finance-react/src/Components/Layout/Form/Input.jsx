import React, { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(({ type, placeholder }, ref) => {
  return (
    <input
      className={styles.input}
      type={type}
      ref={ref}
      placeholder={placeholder}
      required
    />
  );
});

export default Input;
