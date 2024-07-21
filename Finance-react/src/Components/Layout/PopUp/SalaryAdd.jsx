import React, { useRef } from "react";
import axiosClient from "../../../axiosClient";
import PopUp from "./PopUp";

export default function SalaryAdd({show, onClose}) {
    const salaryRef = useRef();
    const descriptionRef = useRef();

    const submit = (e) => {
      e.preventDefault();
      onClose();

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
      <PopUp
        title="Adicionar Salário"
        submit={submit}
        labelValue="Valor do Salário"
        labelDescription="Descrição do Salário"
        refValue={salaryRef}
        refDescription={descriptionRef}
        textButton="Adicionar"
        show={show}
        onClose={onClose}
      />
    );
}
