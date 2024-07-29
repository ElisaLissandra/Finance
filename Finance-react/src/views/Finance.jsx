import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import styles from "../views/Finance.module.css";
import AddButton from "../Components/Layout/Buttons/AddButton.jsx";
import Container from "../Components/Layout/Container.jsx";
import SalaryRow from "../Components/Layout/Table/SalaryRow";
import CostRow from "../Components/Layout/Table/CostRow.jsx";
import Table from "../Components/Layout/Table/Table.jsx";
import SalaryAdd from "../Components/Layout/PopUp/Add/SalaryAdd.jsx";
import CostAdd from "../Components/Layout/PopUp/Add/CostAdd.jsx";
import stylesButtons from "../Components/Layout/Buttons/Buttons.module.css";

export default function Finance() {
    const [finance, setFinance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePopUp, setActivePopUp] = useState(null); 


    // PopUp de adicionar mais salário ou débitos
    const openPopUp = (type) => {
        setActivePopUp(type);
    };

    const closePopUp = () => {
        setActivePopUp(null);
    };

    // Retorna os dados da api
    const fetchFinanceData = () => {
        axiosClient
            .get("/finance")
            .then(({ data }) => {
                const sortedData = data.data.map((item) => {
                    const combined = [
                        ...item.salaries.map(salary => ({ ...salary, type: 'salary' })),
                        ...item.costs.map(cost => ({ ...cost, type: 'cost' }))
                    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    
                    return { ...item, combined };
                });

                setFinance(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados de finanças:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchFinanceData();
    }, []);

    // Exibe o valor total do salário
    const calculateFinance = (salaries, costs) => {
        const totalSalaries = salaries.reduce(
            (total, salary) => total + parseFloat(salary.salary),
            0
        );

        const totalCosts = costs.reduce(
            (total, cost) => total + parseFloat(cost.cost),
            0
        );

        const result = totalSalaries - totalCosts;

        return result > 0 ? result : 0;
    };

    // Atualizar as informações de forma dinâmica
    const handleNewEntry = (newEntry, type) => {
        setFinance(prevFinance => 
            prevFinance.map(item => {
                if (item.id === newEntry.itemId) {
                    const updatedCombined = [
                        ...item.combined,
                        { ...newEntry, type }
                    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    
                    return { ...item, combined: updatedCombined };
                }
                return item;
            })
        );
    };
    

    return (
        <>
            {loading ? (
                <p>Carregando...</p>
            ) : finance.length > 0 ? (
                finance.map((item) => (
                    <Container key={item.id}>
                        <div className={styles.sum_salary}>
                            <p className={styles.title_finance}>
                                Saldo Disponível:{" "}
                            </p>
                            <p className={styles.value_salary}>
                                R${" "}
                                {calculateFinance(item.salaries, item.costs).toFixed(2)}
                            </p>
                        </div>
                        <div className={stylesButtons.buttons}>
                            <AddButton onClick={() => openPopUp('salary')} text="Salário" />
                            <AddButton onClick={() => openPopUp('cost')} text="Débito" />
                        </div>
                        <SalaryAdd
                            show={activePopUp === 'salary'}
                            onClose={closePopUp}
                            onNewEntry={entry => handleNewEntry(entry, 'salary')}
                        />
                        <CostAdd
                            show={activePopUp === 'cost'}
                            onClose={closePopUp}
                            onNewEntry={entry => handleNewEntry(entry, 'cost')}
                        />
                        <Table
                            type="Tipo"
                            date="Data"
                            description="Descrição"
                            value="Valor"
                            text="Ações"
                        >
                            {item.combined.map((entry) => (
                                entry.type === 'salary' ? (
                                    <SalaryRow 
                                    key={entry.id} salary={entry} />
                                ) : (
                                    <CostRow key={entry.id} cost={entry} />
                                )
                            ))}
                        </Table>
                    </Container>
                ))
            ) : (
                <p>Nenhum dado encontrado.</p>
            )}
        </>
    );
}
