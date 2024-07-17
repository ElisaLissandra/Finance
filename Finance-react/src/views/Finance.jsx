import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import styles from "../views/Finance.module.css";
import AddButton from "../Components/Layout/Buttons/AddButton.jsx";
import Container from "../Components/Layout/Container.jsx";

export default function Finance() {
    const [finance, setFinance] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controle do carregamento

    useEffect(() => {
        axiosClient
            .get("/finance")
            .then(({ data }) => {
                setFinance(data.data);
                setLoading(false); // Dados carregados, definir loading como false
            })
            .catch((error) => {
                console.error("Erro ao buscar dados de finanças:", error);
                setLoading(false); // Em caso de erro, definir loading como false
            });
    }, []); // Lista de dependências vazia para garantir que o efeito execute uma vez

    return (
        <>
            <Container>
                {loading ? (
                    <p>Carregando...</p>
                ) : finance.length > 0 ? (
                    finance.map((item) => (
                        <div className={styles.finance_container}>
                            <h1>Finança</h1>
                            <div className={styles.add_button}>
                                <AddButton to="/salary" text="Salário" />
                                <AddButton to="/cost" text="Débito" />
                            </div>
                            <div className={styles.table_container}>
                                <table key={item.id} className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.table_head}>
                                                Tipo
                                            </th>
                                            <th className={styles.table_head}>
                                                Data
                                            </th>
                                            <th className={styles.table_head}>
                                                Descrição
                                            </th>
                                            <th className={styles.table_head}>
                                                Valor
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.salaries.map((salary) => (
                                            <tr key={salary.id} className={styles.table_row}>
                                                <td className={styles.table_row_salary }>
                                                    Entrada
                                                </td>
                                                <td className={styles.table_cell}>
                                                    {salary.created_at}
                                                </td>
                                                <td className={styles.table_cell}>
                                                    {salary.description}
                                                </td>
                                                <td className={styles.table_cell }>
                                                    {salary.salary}
                                                </td>
                                            </tr>
                                        ))}
                                        {item.costs.map((cost) => (
                                            <tr key={cost.id} className={styles.table_row}>
                                                <td className={styles.table_row_cost}>
                                                    Débito
                                                </td>
                                                <td className={styles.table_cell}>
                                                    {cost.created_at}
                                                </td>
                                                <td className={styles.table_cell}>
                                                    {cost.description}
                                                </td>
                                                <td className={styles.table_cell}>
                                                    {cost.cost}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </Container>
        </>
    );
}
