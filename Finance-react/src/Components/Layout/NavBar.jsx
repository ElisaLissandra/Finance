import React from "react";
import styles from "../Layout/NavBar.module.css";
import financeLogo from '../../assets/logo_navbar.png';
export default function NavBar({ user, onLogout }) {
    return (
        <nav className={styles.navbar}>
                <img src={financeLogo} alt="Logo" />
            <ul className={styles.list}>
                <li className={styles.item}>{user.name}</li>
                <li>
                    <button className={styles.logout_button} onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
