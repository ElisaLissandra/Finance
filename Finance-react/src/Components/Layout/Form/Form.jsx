import React from "react";
import styles from "./Form.module.css";

export default function Form({ title, submit, children }) {
  return (
    <div className={styles.form_container}>
      <form onSubmit={submit} className={styles.form}>
        <h1 className={styles.form_title}>{title}</h1>
        {children}
      </form>
    </div>
  );
}
