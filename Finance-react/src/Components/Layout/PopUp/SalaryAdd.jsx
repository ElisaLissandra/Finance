import React, { useRef } from "react";
import axiosClient from "../../../axiosClient";
import PopUpAdd from "./PopUpAdd";

export default function SalaryAdd() {
    const salaryRef = useRef();
    const descriptionRef = useRef();

    const submit = (e) => {
      e.preventDefault();

      const payload = {
        salary: salaryRef.current.value,
        description: descriptionRef.current.value,
      };

        axiosClient
          .post("salary", payload)
          .then((response) => {
              console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
          });
    };

    return (  
      <PopUpAdd
        title="Adicionar Salário"
        submit={submit}
        labelValue="Valor do Salário"
        labelDescription="Descrição do Salário"
        refValue={salaryRef}
        refDescription={descriptionRef}
        textButton="Adicionar Salário"
      />
    );
}
