import React from "react";
import { useNavigate } from "react-router-dom";
import TableStyles from "./Table.module.css";
import stylesButtons from "../Buttons/Buttons.module.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";

export default function SalaryRow({ salary }) {
    const navigate = useNavigate();

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    /* const handleClick = () => {
        navigate("/salary");
    };
 */
    return (
        <tr
            key={salary.id}
            className={TableStyles.table_row}
            
        >
            <td className={TableStyles.table_cell_salary}>Entrada</td>
            <td className={TableStyles.table_cell}>
                {formatDateTime(salary.created_at)}
            </td>
            <td className={TableStyles.table_cell}>{salary.description}</td>
            <td className={TableStyles.table_cell}>R$ {salary.salary}</td>
            <td className={TableStyles.table_cell}>
                <div className={stylesButtons.buttons}>
                    <EditButton/>
                    <DeleteButton/>
                </div>
            </td>
        </tr>
    );
}
