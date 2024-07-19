import React from "react";
import { Link } from "react-router-dom";
import styles from "./DeleteButton.module.css";

export default function DeleteButton() {
  return (
    <Link className={styles.delete_button}>
      Delete
    </Link>
  );
}