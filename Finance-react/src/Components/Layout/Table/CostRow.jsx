import React from "react";
import TableStyles from "./Table.module.css";

export default function CostRow({ cost }) {
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    return (
        <tr key={cost.id} className={TableStyles.table_row}>
            <td className={TableStyles.table_cell_cost}>Débito</td>
            <td className={TableStyles.table_cell}>
                {formatDateTime(cost.created_at)}
            </td>
            <td className={TableStyles.table_cell}>{cost.description}</td>
            <td className={TableStyles.table_cell}>R$ {cost.cost}</td>
        </tr>
    );
}
