import { useRef } from 'react';
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";

export default function login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const Submit = (e) => {
        e.preventDefault();

        const playload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('login', playload) 
        .then(({data}) => {
            setToken(data.token);
            setUser(data.user);
        })
        .catch(err => {
            const response = err.response;

            if(response && response.status ===422) {
                console.log(response.data.errors);
            }
        }); 

    }

    return (
        <form onSubmit={Submit}>
            <input type="email" ref={emailRef} placeholder="Email" required />
            <input type="password" ref={passwordRef} placeholder="Senha" required />
            <button>Entrar</button>
        </form>
    );
}
