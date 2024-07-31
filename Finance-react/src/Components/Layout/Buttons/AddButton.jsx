import React from "react"
import { Link } from "react-router-dom";
import styles from "./Buttons.module.css"
import AddRoundedIcon from '@mui/icons-material/AddRounded';


export default function AddButton({onClick, text}) {
  return (
    <Link className={styles.green_button} onClick={onClick}>
      <div className={styles.buttonContent}>
        <AddRoundedIcon />
        <span>{text}</span>
      </div>
    </Link>
  )
  
}