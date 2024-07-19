import React from "react";
import styles from "./PopUp.module.css";

const PopUp = ({
    title,
    submit,
    labelValue,
    labelDescription,
    refValue,
    refDescription,
    textButton,
}) => {
    return (
        <>
            <div className={styles.popup}>
                <div className={styles.header_popup}>
                    <h2>{title}</h2>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <label className={styles.label}>{labelValue}:</label>
                        <input className={styles.input} type="number" ref={refValue} required />
                    </div>
                    <div>
                        <label  className={styles.label}>{labelDescription}:</label>
                        <input className={styles.input} type="text" ref={refDescription} required />
                    </div>
                    <button className={styles.button} type="submit">{textButton}</button>
                </form>
            </div>
        </>
    );
};

export default PopUp;
