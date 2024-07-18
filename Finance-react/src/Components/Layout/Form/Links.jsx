import React from "react";
import {Link} from "react-router-dom";
import styles from "./Links.module.css";

export default function Links({text, to, textTo}) {
    return (
        <p className={styles.text_register}>
             {text}
            <Link className={styles.link_register} to={to}>
                {textTo}
            </Link>
        </p>
    );
}
