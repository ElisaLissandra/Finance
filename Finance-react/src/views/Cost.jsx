import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import CostRow from "../Components/Layout/Table/CostRow";
import Table from "../Components/Layout/Table/Table";
import Container from "../Components/Layout/Container";
import EditButton from "../Components/Layout/Buttons/EditButton";
import DeleteButton from "../Components/Layout/Buttons/DeleteButton";
import stylesButtons from "../Components/Layout/Buttons/Buttons.module.css";

export default function Cost() {
    const [costs, setCosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/cost")
            .then(({ data }) => {
                setCosts(data.data);
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
                <h1>Débitos</h1>
                {loading ? (
                    <p>Carregando...</p>
                ) : costs.length > 0 ? (
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
                            {costs.map((cost) => (
                                <CostRow key={cost.id} cost={cost} />
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
