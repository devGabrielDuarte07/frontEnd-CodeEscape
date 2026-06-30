import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    const { logout } = useUser();
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const agora = Date.now() / 1000;

        if (payload.exp < agora) {
            logout();

            return <Navigate to="/login" replace />;
        }

        return children;
    }
    catch {
        logout();

        return <Navigate to="/login" replace />;
    }
}