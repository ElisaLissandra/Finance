import React from "react";
import TableStyles from "./Table.module.css";
import { useNavigate } from "react-router-dom";

export default function CostRow({ cost }) {
    const navegate = useNavigate();

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    const handleClick = () => {
        navegate("/cost");
    };

    return (
        <tr key={cost.id} className={TableStyles.table_row} onClick={handleClick}>
            <td className={TableStyles.table_cell_cost}>Débito</td>
            <td className={TableStyles.table_cell}>
                {formatDateTime(cost.created_at)}
            </td>
            <td className={TableStyles.table_cell}>{cost.description}</td>
            <td className={TableStyles.table_cell}>R$ {cost.cost}</td>
        </tr>
    );
}
