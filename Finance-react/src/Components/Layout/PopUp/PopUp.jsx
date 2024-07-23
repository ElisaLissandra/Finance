import React from "react";
import styles from "./PopUp.module.css";

const PopUp = ({
    title,
    show,
    onClose,
    children
}) => {
    
    if (!show) return null;

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.popup}>
                    <div className={styles.header_popup}>
                        <button className={styles.close_button} onClick={onClose}>
                            Fechar
                        </button>
                        <h2>{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default PopUp;
