import axiosClient from "../axiosClient";
import React, { useRef } from 'react';
import { useStateContext } from "../Contexts/ContextProvider"


export default function register () {

    // Referencia as informações adicionas no formulário
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Armazena os dados e o token do usuário 
    const {setUser, setToken} = useStateContext();


    // Envia os dados do formulário para API do Laravel
    const Submit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        // Axios post
        axiosClient.post('register', payload)
            .then(({data}) => {
                setToken(data.token);
                setUser(data.user);

            })
            .catch(err => {
                const response = err.response;
                // Verifica se houve erro de validação 
                if(response && response.status === 422) {
                    console.log(response.data.errors);
                }
        });  
        
            

    }

    return (
        <form onSubmit={Submit}>
            <input type="text" ref={nameRef} placeholder="Nome" required />
            <input type="email" ref={emailRef} placeholder="Email" required />
            <input type="password" ref={passwordRef} placeholder="Senha" required />
            <button>Cadastrar</button>
        </form>
    );

}
