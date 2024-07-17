import React from "react"
import { Link } from "react-router-dom";
import styles from "./AddButton.module.css"



export default function AddButton({to, text}) {
  return (
    <Link className={styles.add_button} to={to}>
      {text}
    </Link>
  )
  
}