import React from "react";
import styles from "./Table.module.css";

export default function Table({children, type, date, description, value, text}) {
    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {/* <th className={styles.table_head}>{type}</th> */}
                        <th className={styles.table_head}>{date}</th>
                        <th className={styles.table_head}>{description}</th>
                        <th className={styles.table_head}>{value}</th>
                        <th className={styles.table_head}>{text}</th>
                    </tr>
                </thead>
                <tbody  className={styles.tbody_scroll}> 
                    {children}
                    <tr>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
