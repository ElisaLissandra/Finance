import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Layout/NavBar";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return navigate("/");
        }

        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setToken(null);
                    navigate("/");
                }
            });
    }, [token, setToken, navigate, setUser]);

    if (!token) {
        return <Navigate to="/" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
            .then(({}) => {
                setUser(null);
                setToken(null);
            })
    }

    return (
        <>
            <NavBar user={user} onLogout={onLogout} />
            <Outlet />
        </>
    );
}