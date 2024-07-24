import React, { useState, useEffect } from "react";
import FormPopUpEdit from "./FormPopUpEdit";
import axiosClient from "../../../../axiosClient";

export default function SalaryEdit({ salary, onClose, show }) {
    const [formData, setFormData] = useState({
        description: "",
        salary: "",
    });

    useEffect(() => {
        if (salary) {
            setFormData({
                description:salary.description,
                salary: salary.salary,
            });
        }
    }, [salary]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .put(`/salary/${salary.slug}`, formData)
            .then((response) => {
                console.log(response.data);
                onClose();
            })
            .catch((error) => {
                console.log(error);
            });
        
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <FormPopUpEdit
            handleSubmit={handleSubmit}
            title="Editar Salário"
            nameValue="salary"
            value={formData.salary}
            nameDescription="description"
            valueDescription={formData.description}
            textButton="Salvar"
            show={show}
            onClose={onClose}
            handleChange={handleChange}
        />
    );
}
