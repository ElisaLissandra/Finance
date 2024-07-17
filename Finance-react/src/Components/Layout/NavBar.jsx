import React from "react";
import styles from "../Layout/NavBar.module.css";
export default function NavBar({ user, onLogout }) {
    return (
        <nav className={styles.navbar}>         
            <ul className={styles.list}>
                <li className={styles.item}>{user.name}</li>
                <li>
                    <button onClick={onLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}
