import React from "react";
import PopUpDelete from "./PopUpDelete";
import axiosClient from "../../../../axiosClient";

export default function SalaryDelete({ salary, show, onClose, onSuccess }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        axiosClient
            .delete(`/salary/${salary.slug}`)
            .then((response) => {
                //console.log(response.data);
                if(onSuccess) {
                    onSuccess('Salário excluído com sucesso!');
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
