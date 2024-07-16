import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

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
        <div>
            <h1>Finance</h1>
            <div>
                <Link to="/salary">Adicionar Salário</Link>
            </div>
            <div>
                <Link to="/cost">Adicionar Despesas</Link>
            </div>
            <div>
                {loading ? (
                    <p>Carregando...</p>
                ) : finance.length > 0 ? (
                    finance.map((item) => (
                        <div key={item.id}>
                            <h3>Salários:</h3>
                            <ul>
                                {item.salaries.map((salary) => (
                                    <li key={salary.id}>
                                        <p>Descrição: {salary.description}</p>
                                        <p>Valor: {salary.salary}</p>
                                    </li>
                                ))}
                            </ul>
                            <h3>Despesas:</h3>
                            <ul>
                                {item.costs.map((cost) => (
                                    <li key={cost.id}>
                                        <p>Descrição: {cost.description}</p>
                                        <p>Valor: {cost.cost}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </div>
        </div>
    );
}
