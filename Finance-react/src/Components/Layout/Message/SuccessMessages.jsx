import React from "react";
import styles from "./Message.module.css";


export default function SuccessMessages({message}) {
  return (
    <div className={styles.message}>
      <p className={styles.message_success}>
        {message}
      </p>
    </div>
  );
}