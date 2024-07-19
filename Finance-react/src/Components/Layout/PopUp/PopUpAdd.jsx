import React from "react";

const PopUpAdd = ({ title, submit, labelValue, labelDescription, refValue, refDescription, textButton }) => {
    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={submit}>
                <div>
                    <label>{labelValue}</label>
                    <input type="number" ref={refValue} required />
                </div>
                <div>
                    <label>{labelDescription}</label>
                    <input type="text" ref={refDescription} required />
                </div>
                <button type="submit">{textButton}</button>
            </form>
        </>
    );
};

export default PopUpAdd;
