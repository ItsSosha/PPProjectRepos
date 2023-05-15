import { useAuthContext } from "./auth"
import { Outlet, Navigate } from "react-router";

const AdminRoutes = () => {

    const { user } = useAuthContext();
    console.log(user);

    return (
        <>
            {user && user.isAdmin ? <Outlet /> : <Navigate to="/"/> } 
        </>
    );
}

export default AdminRoutes;