import React from "react";
import PopUpDelete from "./PopUpDelete";
import axiosClient from "../../../../axiosClient";

export default function SalaryDelete({ salary, show, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .delete(`/salary/${salary.slug}`)
            .then((response) => {
                console.log(response.data);
                onClose();
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
