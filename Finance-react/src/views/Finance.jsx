import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import styles from "../views/Finance.module.css";
import AddButton from "../Components/Layout/Buttons/AddButton.jsx";
import Container from "../Components/Layout/Container.jsx";

export default function Finance() {
    const [finance, setFinance] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axiosClient
            .get("/finance")
            .then(({ data }) => {
                setFinance(data.data);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Erro ao buscar dados de finanças:", error);
                setLoading(false); 
            });
    }, []); // Lista de dependências vazia para garantir que o efeito execute uma vez

    const calculateSalarySum = (salaries) => {
        return salaries.reduce((total, salary) => total + parseFloat(salary.salary), 0);
    }

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('pt-BR', { timeZone: 'UTC' }); 
    };

    return (
        <>
            <Container>
                {loading ? (
                    <p>Carregando...</p>
                ) : finance.length > 0 ? (
                    finance.map((item) => (
                        <div key={item.id} className={styles.finance_container}>
                            <div className={styles.sum_salary}>
                                <p className={styles.title_finance}>Saldo Disponível: </p>
                                <p className={styles.value_salary}>R$ {calculateSalarySum(item.salaries).toFixed(2)}</p>
                            </div>
                            <div className={styles.add_button}>
                                <AddButton to="/salary" text="Salário" />
                                <AddButton to="/cost" text="Débito" />
                            </div>
                            <div className={styles.table_container}>
                                <table className={styles.table}>
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
                                                    {formatDateTime(salary.created_at)}
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
                                                    {formatDateTime(cost.created_at)}
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
