import React from "react";
import styles from "../PopUp.module.css";
import PopUp from "../PopUp";

export default function FormPopUpEdit({
    handleSubmit,
    nameValue,
    nameDescription,
    value,
    valueDescription,
    textButton,
    show,
    onClose,
    title,
    handleChange
}) {
    return (
        <PopUp title={title} show={show} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <label  className={styles.label}>Valor:</label>
                <input
                    className={styles.input}
                    type="number"
                    name={nameValue}
                    value={value}
                    onChange={handleChange}
                />
                <label className={styles.label}>Descrição:</label>
                <input
                  className={styles.input}
                  type="text"
                  name={nameDescription}
                  value={valueDescription}
                  onChange={handleChange}              
                />
                <button className={styles.button} type="submit">
                    {textButton}
                </button>
            </form>
        </PopUp>
    );
}
