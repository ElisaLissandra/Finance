import axiosClient from "../axiosClient";
import React, { useRef } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function register() {
    // Referencia as informações adicionas no formulário
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    //const password_confirmationRef = useRef();
    const navegate = useNavigate();

    // Armazena os dados e o token do usuário
    const { setUser, setToken } = useStateContext();

    // Envia os dados do formulário para API do Laravel
    const Submit = (e) => {
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
                navegate("/login");
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
        <form onSubmit={Submit}>
            <input type="text" ref={nameRef} placeholder="Nome" required />
            <input type="email" ref={emailRef} placeholder="Email" required />
            <input
                type="password"
                ref={passwordRef}
                placeholder="Senha"
                required
            />
            {/* <input type="password" ref={password_confirmationRef} placeholder="Confirmar Senha" required />  */}
            <button>Cadastrar</button>
        </form>
    );
}
