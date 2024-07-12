import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Navigate, Outlet } from "react-router-dom";


export default function DefaultLayout() {

    const { user, token, setUser, setToken } = useStateContext();

    if(!token) {
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

    // Retornar informações do usuário
    useEffect(() =>{
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data.data); 
        })
    }, []);

    return (
        <div>
            <h1>{user.name}</h1>
            <button onClick={onLogout}>Logout</button>
            <Outlet />
        </div>
    )
}