import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Layout/NavBar";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, loading } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (!token) {
            navigate("/");
            return;
        }

        // Carrega dados do usuário se ainda não carregou
        if (!user) {
            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data.data);
                })
                .catch(() => {
                    setToken(null);
                    navigate("/");
                });
        }
    }, [loading, token, user, navigate, setUser, setToken]);

    // Enquanto o contexto está carregando token do localStorage
    if (loading) return null;

    if (!token) return null;
    if (!user) return null; // evita NavBar quebrar

    const onLogout = () => {
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
            navigate("/");
        });
    };

    return (
        <>
            <NavBar user={user} onLogout={onLogout} />
            <Outlet />
        </>
    );
}
