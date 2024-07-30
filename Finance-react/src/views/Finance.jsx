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
import SuccessMessages from "../Components/Layout/Message/SuccessMessages.jsx";

export default function Finance() {
    const [finance, setFinance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePopUp, setActivePopUp] = useState(null);
    const [SuccessMessage, setSuccessMessage] = useState("");

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
                        ...item.salaries.map((salary) => ({
                            ...salary,
                            type: "salary",
                        })),
                        ...item.costs.map((cost) => ({
                            ...cost,
                            type: "cost",
                        })),
                    ].sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at),
                    );
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
            0,
        );

        const totalCosts = costs.reduce(
            (total, cost) => total + parseFloat(cost.cost),
            0,
        );

        const result = totalSalaries - totalCosts;

        return result > 0 ? result : 0;
    };

    // Adiciona um salário ou custo
    const handleAddEntry = (type, entry) => {
        setFinance((prevFinance) => {
            return prevFinance.map((item) => {
                if (item.id === entry.id_user) {
                    const newEntry = { ...entry, type };
                    const updatedCombined = [...item.combined, newEntry].sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at),
                    );
                    return { ...item, combined: updatedCombined };
                }
                return item;
            });
        });
    };

    // Atualizar um salário ou custo
    const handleUpdateEntry = (updatedEntry) => {
        setFinance((prevFinance) => {
            return prevFinance.map((item) => {
                const updatedCombined = item.combined.map((entry) =>
                    entry.id === updatedEntry.id
                        ? { ...entry, ...updatedEntry }
                        : entry,
                );

                return {
                    ...item,
                    combined: updatedCombined,
                };
            });
        });
    };

    // Remove um salário ou custo
    const handleRemoveEntry = (RemoveFinanceId) => {
        setFinance((prevFinance) => {
            return prevFinance.map((item) => {
                const filteredCombined = item.combined.filter(
                    (entry) => entry.id !== RemoveFinanceId.id,
                );
                return { ...item, combined: filteredCombined };
            });
        });
    };

    // Exibir as mensagens de sucesso
    const handleSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage("");
        }, 5000);
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
                                {calculateFinance(
                                    item.salaries,
                                    item.costs,
                                ).toFixed(2)}
                            </p>
                        </div>
                        {SuccessMessages && (
                            <SuccessMessages message={SuccessMessage} />
                        )}
                        <div className={stylesButtons.buttons}>
                            <AddButton
                                onClick={() => openPopUp("salary")}
                                text="Salário"
                            />
                            <AddButton
                                onClick={() => openPopUp("cost")}
                                text="Débito"
                            />
                        </div>
                        <SalaryAdd
                            show={activePopUp === "salary"}
                            onClose={closePopUp}
                            onSuccess={(message, entry) => {
                                handleSuccessMessage(message);
                                handleAddEntry("salary", entry);
                            }}
                        />
                        <CostAdd
                            show={activePopUp === "cost"}
                            onClose={closePopUp}
                            onSuccess={(message, entry) => {
                                handleSuccessMessage(message);
                                handleAddEntry("cost", entry);
                            }}
                        />
                        <Table
                            /*  type="Tipo" */
                            date="Data"
                            description="Descrição"
                            value="Valor"
                            text="Ações"
                        >
                            {item.combined.length > 0 ? (
                                item.combined.map((entry) =>
                                    entry.type === "salary" ? (
                                        <SalaryRow
                                            key={entry.id}
                                            salary={entry}
                                            onSuccess={(
                                                message,
                                                updatedEntry,
                                            ) => {
                                                handleSuccessMessage(message);
                                                handleUpdateEntry(updatedEntry);
                                            }}
                                            onDelete={(
                                                message,
                                                RemoveFinanceId,
                                            ) => {
                                                handleSuccessMessage(message);
                                                handleRemoveEntry(RemoveFinanceId);
                                            }}
                                        />
                                    ) : (
                                        <CostRow
                                            key={entry.id}
                                            cost={entry}
                                            onSuccess={(
                                                message,
                                                updatedEntry,
                                            ) => {
                                                handleSuccessMessage(message);
                                                handleUpdateEntry(updatedEntry);
                                            }}
                                            onDelete={(
                                                message,
                                                RemoveFinanceId,
                                            ) => {
                                                handleSuccessMessage(message);
                                                handleRemoveEntry(RemoveFinanceId);
                                            }}
                                        />
                                    ),
                                )
                            ) : (
                                <tr className={styles.message_nodata}>
                                    <td>Nenhum dado encontrado.</td>
                                </tr>
                            )}
                        </Table>
                    </Container>
                ))
            ) : (
                <p className={styles.message_nodata}>Nenhum dado encontrado.</p>
            )}
        </>
    );
}
