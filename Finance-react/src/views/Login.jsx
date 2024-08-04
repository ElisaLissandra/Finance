import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import Form from "../Components/Layout/Form/Form.jsx";
import Input from "../Components/Layout/Form/Input.jsx";
import Button from "../Components/Layout/Form/Button.jsx";
import Links from "../Components/Layout/Form/Links.jsx";
import styles from "../Components/Layout/Message/Message.module.css";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const [errorMessage, setErrorMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("login", payload)
            .then(({ data }) => {
                const { token, user} = data.data;
                setToken(token);
                setUser(user);
                navigate("/finance");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 401) {
                    setErrorMessage("E-mail ou senha inválidos");
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 5000);
                } else if (response && response.status === 422) {
                    setErrorMessage(
                        "Por favor, preencha todos os campos corretamente.",
                    );
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 5000);
                } else {
                    setErrorMessage(
                        "Ocorreu um erro. Tente novamente mais tarde.",
                    );
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 5000);
                }
            });
    };

    return (
        <Form title="Login" submit={submit}>
            <Input type="email" ref={emailRef} placeholder="Email" />
            <Input type="password" ref={passwordRef} placeholder="Senha" />
            {errorMessage && (
              <div className={styles.message_error}  style={{ display: errorMessage ? 'block' : 'none' }}>{errorMessage}</div>
            )}
            <Button type="submit" text="Login" />
            <Links
                text="Não está registrado?"
                to="/register"
                textTo="Crie uma conta"
            />
        </Form>
    );
}
