import React from "react";
import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";

export default function EditButton() {
  return (
    <Link className={styles.edit_button}>
      Editar
    </Link>
  );
}