// Form.jsx
import React from "react";
import styles from "./Form.module.css";

export default function Form({ title, Submit, children }) {
  return (
    <div className={styles.form_container}>
      <form onSubmit={Submit} className={styles.form}>
        <h1 className={styles.form_title}>{title}</h1>
        {children}
      </form>
    </div>
  );
}