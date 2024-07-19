import React from "react";
import styles from "./Table.module.css";

export default function Table({children, type, date, description, value}) {
    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.table_head}>{type}</th>
                        <th className={styles.table_head}>{date}</th>
                        <th className={styles.table_head}>{description}</th>
                        <th className={styles.table_head}>{value}</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}
