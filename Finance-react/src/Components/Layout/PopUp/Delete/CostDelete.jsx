import React from "react";
import PopUpDelete from "./PopUpDelete";
import axiosClient from "../../../../axiosClient";

export default function CostDelete({cost, show, onClose, onSuccess}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    axiosClient
     .delete(`/cost/${cost.slug}`)
     .then((response) => {
        //console.log(response.data);
        if(onSuccess) {
          onSuccess('Débito excluído com sucesso!');
        }
      })
     .catch((error) => {
        console.log(error);
      });
  }

  return (
    <PopUpDelete
      onConfirm={handleSubmit}
      title="Excluir Débito"
      show={show}
      onClose={onClose}
    />
  );

}