import React from 'react';
import styles from "./Button.module.css";

export default function Button({ type, text }) {
  return (
    <button type={type} className={styles.form_button}>{text}</button>
  );
}
