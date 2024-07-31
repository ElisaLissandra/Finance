import React from "react";
import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function DeleteButton({onClick}) {
  return (
    <Link className={styles.red_button} onClick={onClick}>
      <DeleteRoundedIcon />
    </Link>
  );
}