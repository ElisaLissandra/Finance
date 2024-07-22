import React from "react";
import TableStyles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import stylesButtons from "../Buttons/Buttons.module.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";

export default function CostRow({ cost }) {
    const navigate = useNavigate();

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    const handleClick = () => {
        navigate("/cost");
    };

    return (
        <tr key={cost.id} className={TableStyles.table_row} onClick={handleClick}>
            <td className={TableStyles.table_cell_cost}>Débito</td>
            <td className={TableStyles.table_cell}>
                {formatDateTime(cost.created_at)}
            </td>
            <td className={TableStyles.table_cell}>{cost.description}</td>
            <td className={TableStyles.table_cell}>R$ {cost.cost}</td>
            <td className={TableStyles.table_cell}>
                <div className={stylesButtons.buttons}>
                    <EditButton/>
                    <DeleteButton/>
                </div>
            </td>
        </tr>
    );
}
