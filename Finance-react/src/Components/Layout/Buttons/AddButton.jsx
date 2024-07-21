import React from "react"
import { Link } from "react-router-dom";
import styles from "./AddButton.module.css"

export default function AddButton({onClick, text}) {
  return (
    <Link className={styles.add_button} onClick={onClick}>
      {text}
    </Link>
  )
  
}