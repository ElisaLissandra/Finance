import React, { useState } from "react";
import TableStyles from "./Table.module.css";
import stylesButtons from "../Buttons/Buttons.module.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import CostEdit from "../PopUp/Edit/CostEdit";
import CostDelete from "../PopUp/Delete/CostDelete";

export default function CostRow({ cost, onSuccess, onDelete }) {
    const [activeEditPopUp, setActiveEditPopUp] = useState(false);
    const [activeDeletePopUp, setActiveDeletePopUp] = useState(false);
    const [editedCost, setEditedCost] = useState(null);
    const [costToDelete, setCostToDelete] = useState(null);


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
        setActiveEditPopUp(true);
    };


    const openDeletePopUp = () => {
        setCostToDelete({
            slug: cost.slug,
            description: cost.description,
            cost: cost.cost,
        });
        setActiveDeletePopUp(true);
    };

    const closePopUp = () => {
        setActiveEditPopUp(false);
        setActiveDeletePopUp(false);
    };

    return (
        <>
            <tr
                key={cost.id}
                className={TableStyles.table_row}
            >
                {/* <td className={TableStyles.table_cell_cost}>Débito</td> */}
                <td className={TableStyles.table_cell}>
                    {formatDateTime(cost.created_at)}
                </td>
                <td className={TableStyles.table_cell}>{cost.description}</td>
                <td className={TableStyles.table_cell_cost}> - R$ {cost.cost}</td>
                <td className={TableStyles.table_cell}>
                    <div className={stylesButtons.buttons_table}>
                        <EditButton onClick={openPopUp} />
                        <DeleteButton onClick={openDeletePopUp}/>
                    </div>
                </td>
            </tr>
            <CostEdit
                cost={editedCost}
                show={activeEditPopUp}
                onClose={closePopUp}
                onSuccess={onSuccess}
            />
            <CostDelete
                cost={costToDelete}
                show={activeDeletePopUp}
                onClose={closePopUp}
                onSuccess={onSuccess}
                onDelete={onDelete}
            />
        </>
    );
}
