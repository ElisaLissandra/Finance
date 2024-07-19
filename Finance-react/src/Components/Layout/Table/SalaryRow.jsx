import React from "react";
import { useNavigate } from "react-router-dom";
import TableStyles from "./Table.module.css";

export default function SalaryRow({salary}) {
  const navegate = useNavigate();

  const formatDateTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      return date.toLocaleString('pt-BR', { timeZone: 'UTC' }); 
  };

  const handleClick = () => {
    navegate("/salary");
  };

  return (
    <tr key={salary.id} className={TableStyles.table_row} onClick={handleClick}>
      <td className={TableStyles.table_cell_salary}>
        Entrada
      </td>
      <td className={TableStyles.table_cell}>
        {formatDateTime(salary.created_at)}
      </td>
      <td className={TableStyles.table_cell}>
        {salary.description}
      </td>
      <td className={TableStyles.table_cell}>
        R$ {salary.salary}
      </td>
    </tr>
  );
}