import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import SalaryRow from "../Components/Layout/Table/SalaryRow";
import Table from "../Components/Layout/Table/Table";
import Container from "../Components/Layout/Container";
import EditButton from "../Components/Layout/Buttons/EditButton";
import DeleteButton from "../Components/Layout/Buttons/DeleteButton";
import stylesButtons from "../Components/Layout/Buttons/Buttons.module.css";

export default function Salary() {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/salary")
            .then(({ data }) => {
                setSalaries(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados de salários:", error);
                setLoading(false);
            });
    });

    return (
        <>
            <Container>
                <h1>Salários</h1>
                {loading ? (
                    <p>Carregando...</p>
                ) : salaries.length > 0 ? (
                    <>
                        <div className={stylesButtons.buttons}>
                            <EditButton />
                            <DeleteButton />
                        </div>
                        <Table
                            type="Tipo"
                            date="Data"
                            description="Descrição"
                            value="Valor"
                        >
                            {salaries.map((salary) => (
                                <SalaryRow key={salary.id} salary={salary} />
                            ))}
                        </Table>
                    </>
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </Container>
        </>
    );
}
