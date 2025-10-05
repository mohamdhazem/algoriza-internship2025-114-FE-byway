import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUserRole } from "./auth";

export default function ProtectedRoute({ allowedRoles }) {
    const token = getToken();
    const role = getUserRole();

    if (!token) {
        return <Navigate to="/AdminLogin" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        if (role === "Admin") return <Navigate to="/Dashboard" replace />;
        if (role === "User") return <Navigate to="/Landing" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
