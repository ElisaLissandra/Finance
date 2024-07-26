import React from "react";
import styles from "../PopUp.module.css";
import PopUp from "../PopUp";
import stylesButtons from "../../Buttons/Buttons.module.css"

export default function FormPopUpAdd({
    submit,
    labelValue,
    labelDescription,
    refValue,
    refDescription,
    textButton,
    show,
    onClose,
    title
}) {
    return (
        <PopUp title={title} show={show} onClose={onClose}>
            <form onSubmit={submit}>
                <div>
                    <label className={styles.label}>{labelValue}:</label>
                    <input
                        className={styles.input}
                        type="number"
                        ref={refValue}
                        required
                    />
                </div>
                <div>
                    <label className={styles.label}>{labelDescription}:</label>
                    <input
                        className={styles.input}
                        type="text"
                        ref={refDescription}
                        required
                    />
                </div>
                <button className={stylesButtons.green_button} type="submit">
                    {textButton}
                </button>
            </form>
        </PopUp>
    );
}
