import axiosClient from "../axiosClient";
import React, { useRef } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Layout/Form/Form";
import Input from "../Components/Layout/Form/Input";
import Button from "../Components/Layout/Form/Button";
import Links from "../Components/Layout/Form/Links";

export default function register() {
    // Referencia as informações adicionas no formulário
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    //const password_confirmationRef = useRef();
    const navigate = useNavigate();

    // Armazena os dados e o token do usuário
    const { setUser, setToken } = useStateContext();

    // Envia os dados do formulário para API do Laravel
    const submit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            //password_confirmation: password_confirmationRef.current.value
        };

        // Axios post
        axiosClient
            .post("register", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
                navigate("/");
            })
            .catch((err) => {
                const response = err.response;
                // Verifica se houve erro de validação
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <>
            <Form title="Cadastre-se" submit={submit}>
                <Input 
                    type="text" 
                    ref={nameRef} 
                    placeholder="Nome" 
                />
                <Input 
                    type="email" 
                    ref={emailRef} 
                    placeholder="Email" />
                <Input 
                    type="password" 
                    ref={passwordRef}
                     placeholder="Senha" 
                />
                <Button type="submit" text="Cadastrar" />
                <Links text="Já possui login?" to="/" textTo="Login" />
            </Form>
        </>
    );
}
