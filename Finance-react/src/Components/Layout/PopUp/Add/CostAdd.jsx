import React, { useRef } from "react";
import axiosClient from "../../../axiosClient";
import PopUp from "./PopUp";

export default function CostAdd({show, onClose}) {
    const costRef = useRef();
    const descriptionRef = useRef();

    const submit = (e) => {
      e.preventDefault();
      onClose();

      const payload = {
        cost: costRef.current.value,
        description: descriptionRef.current.value,
      };

        axiosClient
          .post("cost", payload)
          .then((response) => {
              console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
          });
    };

    return (  
      <PopUp
        title="Adicionar Débito"
        submit={submit}
        labelValue="Valor do Débito"
        labelDescription="Descrição do Débito"
        refValue={costRef}
        refDescription={descriptionRef}
        textButton="Adicionar"
        show={show}
        onClose={onClose}
      />
    );
}
