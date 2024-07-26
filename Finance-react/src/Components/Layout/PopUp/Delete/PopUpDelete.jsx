import React from 'react';
import PopUp from "../PopUp";
import styles from "../PopUp.module.css";
import stylesButtons from "../../Buttons/Buttons.module.css"

export default function PopUpDelete({title, show, onClose, onConfirm}) {
    return (
        <>
            <PopUp title={title} show={show} onClose={onClose}>
                <p className={styles.subtitle}>Tem certeza que deseja excluir?</p>
                <div className={stylesButtons.buttons}>
                    <button className={stylesButtons.green_button} onClick={onConfirm}>Sim</button>
                    <button className={stylesButtons.red_button} onClick={onClose}>Não</button>
                </div>
            </PopUp>
        </>
    );
}
