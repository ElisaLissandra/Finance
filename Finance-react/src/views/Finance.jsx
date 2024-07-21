import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import styles from "../views/Finance.module.css";
import AddButton from "../Components/Layout/Buttons/AddButton.jsx";
import Container from "../Components/Layout/Container.jsx";
import SalaryRow from "../Components/Layout/Table/SalaryRow";
import CostRow from "../Components/Layout/Table/CostRow.jsx";
import Table from "../Components/Layout/Table/Table.module.jsx";
import SalaryAdd from "../Components/Layout/PopUp/SalaryAdd.jsx";
import CostAdd from "../Components/Layout/PopUp/CostAdd.jsx";

export default function Finance() {
    const [finance, setFinance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);


    const openPopUp = () =>{
        setShowPopUp(true);
    }

    const closePopUp = () => {
        setShowPopUp(false);
    }

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
        return salaries.reduce(
            (total, salary) => total + parseFloat(salary.salary),
            0,
        );
    };

    return (
        <>
            {loading ? (
                <p>Carregando...</p>
            ) : finance.length > 0 ? (
                finance.map((item) => (
                    <Container>
                        <div className={styles.sum_salary}>
                            <p className={styles.title_finance}>
                                Saldo Disponível:{" "}
                            </p>
                            <p className={styles.value_salary}>
                                R${" "}
                                {calculateSalarySum(item.salaries).toFixed(2)}
                            </p>
                        </div>
                        <div className={styles.add_button}>
                            <AddButton onClick={openPopUp} text="Salário" />
                            <AddButton onClick={openPopUp} text="Débito" />
                        </div>
                        <SalaryAdd show={showPopUp} onClose={closePopUp} />
                        <CostAdd show={showPopUp} onClose={closePopUp}/>
                        <Table
                            type="Tipo"
                            date="Data"
                            description="Descrição"
                            value="Valor"
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
