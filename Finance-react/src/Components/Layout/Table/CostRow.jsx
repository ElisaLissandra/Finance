import React, { useState } from "react";
import TableStyles from "./Table.module.css";
import stylesButtons from "../Buttons/Buttons.module.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import CostEdit from "../PopUp/Edit/CostEdit";

export default function CostRow({ cost }) {
    const [activePopUp, setActivePopUp] = useState(null);
    const [editedCost, setEditedCost] = useState(null);

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    const openPopUp = () => {
        setEditedCost({
            slug: cost.slug,
            description: cost.description,
            cost: cost.cost,
        });
        setActivePopUp(true);
    };

    const closePopUp = () => {
        setActivePopUp(false);
    };

    return (
        <>
            <tr
                key={cost.id}
                className={TableStyles.table_row}
            >
                <td className={TableStyles.table_cell_cost}>Débito</td>
                <td className={TableStyles.table_cell}>
                    {formatDateTime(cost.created_at)}
                </td>
                <td className={TableStyles.table_cell}>{cost.description}</td>
                <td className={TableStyles.table_cell}>R$ {cost.cost}</td>
                <td className={TableStyles.table_cell}>
                    <div className={stylesButtons.buttons}>
                        <EditButton onClick={openPopUp} />
                        <DeleteButton />
                    </div>
                </td>
            </tr>
            <CostEdit
                cost={editedCost}
                show={activePopUp}
                onClose={closePopUp}
            />
        </>
    );
}
