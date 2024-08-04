import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Layout/NavBar";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        const isTokenValid = (token) => {
            console.log("Access token");
            return token !== null;
        };

        if (!isTokenValid(token)) {
            setToken(null);
            navigate("/");
        }

        if(!user) {
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
    }, [token, navigate, setUser, setToken]);

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
            navigate("/");
        });
    };

    if (!token) {
        return null;
    }

    return (
        <>
            <NavBar user={user} onLogout={onLogout} />
            <Outlet />
        </>
    );
}
