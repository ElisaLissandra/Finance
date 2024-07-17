import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

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
        <div>
            <h1>Salary</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : salaries.length > 0 ? (
                salaries.map((salary) => (
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={salary.id}>
                                <td>{salary.created_at}</td>
                                <td>{salary.description}</td>
                                <td>{salary.salary}</td>
                                <td>Botão de editar</td>
                                <td>Botão de exluir</td>
                            </tr>
                        </tbody>
                    </table>
                ))
            ) : (
                <p>Nenhum dado encontrado.</p>
            )}
        </div>
    );
}
