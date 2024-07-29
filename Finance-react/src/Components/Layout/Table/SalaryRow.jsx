import React, { useState } from "react";
import TableStyles from "./Table.module.css";
import stylesButtons from "../Buttons/Buttons.module.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import SalaryEdit from "../PopUp/Edit/SalaryEdit.jsx";
import SalaryDelete from "../PopUp/Delete/SalaryDelete.jsx";

export default function SalaryRow({ salary, onSuccess }) {
    const [activeEditPopUp, setActiveEditPopUp] = useState(false); 
    const [activeDeletePopUp, setActiveDeletePopUp] = useState(false); 
    const [editedSalary, setEditedSalary] = useState(null);
    const [salaryToDelete, setSalaryToDelete] = useState(null);

    const openPopUp = () => {
        setEditedSalary({
            slug: salary.slug,
            description: salary.description,
            salary: salary.salary,
        });

        setActiveEditPopUp(true);
    };

    const openDeletePopUp = () => {
       setSalaryToDelete({
        slug: salary.slug,
        description: salary.description,
        salary: salary.salary,
    });
       setActiveDeletePopUp(true);
    };

    const closePopUp = () => {
        setActiveEditPopUp(false);
        setActiveDeletePopUp(false);
    };


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString("pt-BR", { timeZone: "UTC" });
    };

    return (
        <>
            <tr key={salary.id} className={TableStyles.table_row}>
                {/* <td className={TableStyles.table_cell_salary}>Entrada</td> */}
                <td className={TableStyles.table_cell}>
                    {formatDateTime(salary.created_at)}
                </td>
                <td className={TableStyles.table_cell}>{salary.description}</td>
                <td className={TableStyles.table_cell_salary}> + R$ {salary.salary}</td>
                <td className={TableStyles.table_cell}>
                    <div className={stylesButtons.buttons_table}>
                        <EditButton onClick={openPopUp} />
                        <DeleteButton onClick={openDeletePopUp} />
                    </div>
                </td>
            </tr>
            <SalaryEdit 
                salary={editedSalary}  
                show={activeEditPopUp} 
                onClose={closePopUp}
                onSuccess={onSuccess}
            /> 
            <SalaryDelete 
            salary={salaryToDelete}
            show={activeDeletePopUp}
            onClose={closePopUp}
            onSuccess={onSuccess}
            />    
        </>
    );
}
