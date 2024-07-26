import React from "react";
import PopUpDelete from "./PopUpDelete";
import axiosClient from "../../../../axiosClient";

export default function CostDelete({cost, show, onClose}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
     .delete(`/cost/${cost.slug}`)
     .then((response) => {
        console.log(response.data);
        onClose();
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