import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import styles from "../views/Login.module.css";

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
        <div className={styles.container_login_signup}>
            <form onSubmit={Submit} className={styles.login_signup_form}>
                <h1 className={styles.login_title}>Login</h1>
                <input
                    className={styles.login_input}
                    type="email"
                    ref={emailRef}
                    placeholder="Email"
                    required
                />
                <input
                    className={styles.login_input}
                    type="password"
                    ref={passwordRef}
                    placeholder="Senha"
                    required
                />
                <button className={styles.btn_login}>Entrar</button>
                <p className={styles.text_register}>
                    Não está registrado?{" "}
                    <Link  className={styles.link_register} to="/register">Crie uma conta</Link>
                </p>
            </form>
        </div>
    );
}
