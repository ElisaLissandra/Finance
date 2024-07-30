import React from "react";
import PopUpDelete from "./PopUpDelete";
import axiosClient from "../../../../axiosClient";

export default function SalaryDelete({ salary, show, onClose, onDelete}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        axiosClient
            .delete(`/salary/${salary.slug}`)
            .then((response) => {
                //console.log(response.data.data);
                if(onDelete) {
                    onDelete(response.data.message, response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <PopUpDelete
            onConfirm={handleSubmit}
            title="Excluir Salário"
            show={show}
            onClose={onClose}
        />
    );
}
