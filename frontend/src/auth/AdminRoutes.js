import { useAuthContext } from "./auth"
import { Outlet, Navigate } from "react-router";

const AdminRoutes = () => {

    const { user } = useAuthContext();

    return (
        <>
            {user && user.isAdmin ? <Outlet /> : <Navigate to="/"/> } 
        </>
    );
}

export default AdminRoutes;