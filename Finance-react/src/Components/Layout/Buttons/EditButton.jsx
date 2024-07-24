import React from "react";
import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";

export default function EditButton({onClick}) {
  return (
    <Link className={styles.edit_button} onClick={onClick}>
      Editar
    </Link>
  );
}