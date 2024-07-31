import React from "react";
import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function EditButton({onClick}) {
  return (
    <Link className={styles.orange_button} onClick={onClick}>
      <EditRoundedIcon />
    </Link>
  );
}