import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

export default function login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const { setUser, setToken } = useStateContext();

    const Submit = (e) => {
        e.preventDefault();

        const playload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('login', playload) 
        .then(({data}) => {
            setToken(data.data.token);
            setUser(data.data.user);
            navigate('/finance');
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
            <p className="message">
                Não está registrado? <Link to="/register">Crie uma conta</Link>
            </p>
        </form>
    );
}
