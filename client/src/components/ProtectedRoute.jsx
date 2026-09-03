import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const location = useLocation();

    let user = null;

    try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            user = JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Invalid user data in localStorage:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    // User is not logged in
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // User doesn't have required role
    if (role && user.role !== role) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    // Authorized user
    return children;
}

export default ProtectedRoute;