import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

export default function GuestLayout() {

    const { token } = useStateContext();
   // console.log(token);

    if(token) {
        return <Navigate to='/finance' />
    }

    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}