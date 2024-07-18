import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import Form from "../Components/Layout/Form/Form.jsx";
import Input from "../Components/Layout/Form/Input.jsx";
import Button from "../Components/Layout/Form/Button.jsx";
import Links from "../Components/Layout/Form/Links.jsx";

export default function login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const { setUser, setToken } = useStateContext();

    const Submit = (e) => {
        e.preventDefault();

        const playload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("login", playload)
            .then(({ data }) => {
                setToken(data.data.token);
                setUser(data.data.user);
                navigate("/finance");
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <>
            <Form title="Login" onSubmit={Submit}>
                <Input type="email" ref={emailRef} placeholder="Email" />
                <Input type="password" ref={passwordRef} placeholder="Senha" />
                <Button type="submit" text="Login"/>
                <Links text="Não está registrado?" to="/register" textTo="Crie uma conta"/>
            </Form>
        </>
    );
}
