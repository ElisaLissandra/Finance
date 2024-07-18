import React from "react";
import styles from "./Input.module.css";

export default function Input({type, ref, placeholder}) {
    return(
      <input 
        className={styles.input}
        type={type}
        ref={ref}
        placeholder={placeholder}
        required
      />
    );
}