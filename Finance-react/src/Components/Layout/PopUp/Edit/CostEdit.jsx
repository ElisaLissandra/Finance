import React, { useState, useEffect } from "react";
import axiosClient from "../../../../axiosClient";
import FormPopUpEdit from "./FormPopUpEdit";


export default function CostEdit({cost, onClose, show, onSuccess}) {
    const [formData, setFormData] = useState({
      description: "",
      cost: "",
    });

    useEffect(() => {
      if (cost) {
        setFormData({
          description: cost.description,
          cost: cost.cost,
        });
      }
    }, [cost]);

    const handleSubmit = (e) => {
      e.preventDefault();
      onClose();
      axiosClient
      .put(`/cost/${cost.slug}`, formData)
      .then((response) => {
        //console.log(response.data.data);
        if(onSuccess) {
          onSuccess(response.data.message, response.data.data);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const handleChange = (e) => {
      setFormData({
       ...formData,
        [e.target.name]: e.target.value,
      });
    }


    return(
      <FormPopUpEdit
        handleSubmit={handleSubmit}
        title="Editar Débito"
        nameValue="cost"
        value={formData.cost}
        nameDescription="description"
        valueDescription={formData.description}
        textButton="Salvar"
        show={show}
        onClose={onClose}
        handleChange={handleChange}
      />
    );

}