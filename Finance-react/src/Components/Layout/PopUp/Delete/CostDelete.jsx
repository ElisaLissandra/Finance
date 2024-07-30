import React from "react";
import PopUpDelete from "./PopUpDelete";
import axiosClient from "../../../../axiosClient";

export default function CostDelete({cost, show, onClose, onDelete}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    axiosClient
     .delete(`/cost/${cost.slug}`)
     .then((response) => {
        //console.log(response.data.data);
        if(onDelete) {
          onDelete(response.data.message, response.data.data);
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