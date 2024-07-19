import React from "react";
import TableStyles from "./Table.module.css";

export default function SalaryRow({salary}) {
  const formatDateTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      return date.toLocaleString('pt-BR', { timeZone: 'UTC' }); 
  };

  return (
    <tr key={salary.id} className={TableStyles.table_row}>
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