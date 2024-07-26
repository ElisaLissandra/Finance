import React from "react";
import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";

export default function DeleteButton({onClick}) {
  return (
    <Link className={styles.red_button} onClick={onClick}>
      Delete
    </Link>
  );
}