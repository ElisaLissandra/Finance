import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import styles from "../views/Finance.module.css";
import AddButton from "../Components/Layout/Buttons/AddButton.jsx";
import Container from "../Components/Layout/Container.jsx";
import SalaryRow from "../Components/Layout/Table/SalaryRow";
import CostRow from "../Components/Layout/Table/CostRow.jsx";
import Table from "../Components/Layout/Table/Table.jsx";
import SalaryAdd from "../Components/Layout/PopUp/Add/SalaryAdd.jsx";
import CostAdd from "../Components/Layout/PopUp/Add/SalaryAdd.jsx";
import stylesButtons from "../Components/Layout/Buttons/Buttons.module.css";


export default function Finance() {
    const [finance, setFinance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePopUp, setActivePopUp] = useState(null); 

    const openPopUp = (type) => {
        setActivePopUp(type);
    };

    const closePopUp = () => {
        setActivePopUp(null);
    };

    const fetchFinanceData = () => {
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
    };

    useEffect(() => {
        fetchFinanceData();
    }, []);

    const calculateFinance = (salaries, costs) => {
        const totalSalaries = salaries.reduce(
            (total, salary) => total + parseFloat(salary.salary),
            0
        );

        const totalCosts = costs.reduce(
            (total, cost) => total + parseFloat(cost.cost),
            0
        );

        return totalSalaries - totalCosts;
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
                        />
                        <CostAdd
                            show={activePopUp === 'cost'}
                            onClose={closePopUp}
                        />
                        <Table
                            type="Tipo"
                            date="Data"
                            description="Descrição"
                            value="Valor"
                            text="Ações"
                        >
                            {item.salaries.map((salary) => (
                                <SalaryRow key={salary.id} salary={salary} />

                            ))}
                            {item.costs.map((cost) => (
                                <CostRow key={cost.id} cost={cost} />
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
