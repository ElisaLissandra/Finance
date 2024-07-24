import React, { useState } from "react";
import TableStyles from "./Table.module.css";
import stylesButtons from "../Buttons/Buttons.module.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import SalaryEdit from "../PopUp/Edit/SalaryEdit.jsx";

export default function SalaryRow({ salary }) {
    const [activePopUp, setActivePopUp] = useState(null); 
    const [editedSalary, setEditedSalary] = useState(null);

    const openPopUp = () => {
        setEditedSalary({
            slug: salary.slug,
            description: salary.description,
            salary: salary.salary,
        });

        setActivePopUp(true);
    };

    const closePopUp = () => {
        setActivePopUp(false);
    };


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    return (
        <>
            <tr key={salary.id} className={TableStyles.table_row}>
                <td className={TableStyles.table_cell_salary}>Entrada</td>
                <td className={TableStyles.table_cell}>
                    {formatDateTime(salary.created_at)}
                </td>
                <td className={TableStyles.table_cell}>{salary.description}</td>
                <td className={TableStyles.table_cell}>R$ {salary.salary}</td>
                <td className={TableStyles.table_cell}>
                    <div className={stylesButtons.buttons}>
                        <EditButton onClick={openPopUp} />
                        <DeleteButton />
                    </div>
                </td>
            </tr>
            <SalaryEdit 
                salary={editedSalary}  
                show={activePopUp} 
                onClose={closePopUp}
            />        
        </>
    );
}
