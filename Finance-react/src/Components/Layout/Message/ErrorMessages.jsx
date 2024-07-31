import React from "react";
import styles from "./Message.module.css";


export default function ErrorMessages({message}) {
  return (
    <div className={styles.message}  style={{ display: message ? 'block' : 'none' }}>
      <p className={styles.message_error}>
        {message}
      </p>
    </div>
  );
}