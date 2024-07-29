import React, { useRef } from "react";
import axiosClient from "../../../../axiosClient";
import FormPopUpAdd from "./FormPopUpAdd";

export default function SalaryAdd({show, onClose, onNewEntry, onSuccess}) {
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
              //console.log(response.data);
              const newEntry = response.data;
              if(onNewEntry) {
                onNewEntry(newEntry,'salary');
              }

              if(onSuccess) {
                onSuccess('Salário adicionado com sucesso!');
              }
              setTimeout(() => {
                onClose();
              }, 5000);
          })
          .catch((error) => {
              console.log(error);
          });
    };
    
    return (  
      <FormPopUpAdd
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
