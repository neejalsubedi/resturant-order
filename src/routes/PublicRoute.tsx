import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/components/contextApi/AuthContext";
import { findFirstValidPath } from "@/routes/routeUtils";

/**
 * PublicRoute — wraps public-only pages (Login, Register, etc.)
 *
 * • If the user is still loading their session → render nothing (avoid flash).
 * • If authenticated → redirect to their first permitted module path.
 * • Otherwise → render the child route (<Outlet />).
 */
export default function PublicRoute() {
    const { isAuthenticated, loading, user } = useAuth();
    <Navigate to="/home" state={{ from: location }} replace />;
    if (loading) {
        return null; // or a full-page spinner
    }

    if (isAuthenticated) {
        const firstPath =
            user?.moduleList ? findFirstValidPath(user.moduleList) : null;
        return <Navigate to={firstPath ?? "/unauthorized"} replace />;
    }

    return <Outlet />;
}
