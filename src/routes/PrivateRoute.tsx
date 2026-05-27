import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/components/contextApi/AuthContext";
import { flattenAllowedPaths, isPathAllowed } from "@/routes/routeUtils";

/**
 * PrivateRoute — wraps all authenticated pages.
 *
 * Behaviour:
 *  1. Loading  → render nothing (prevent flash-redirect while session resolves).
 *  2. Not authenticated → redirect to /login.
 *  3. Authenticated but current path NOT in user.moduleList → /unauthorized.
 *  4. Authenticated & path allowed → render child routes (<Outlet />).
 *
 * Permission model:
 *  The moduleList is flattened into a set of paths. Prefix matching is used,
 *  so if the backend grants "/user" the user can also visit "/user/add",
 *  "/user/123/edit", etc. without each sub-route being listed explicitly.
 */
export default function PrivateRoute() {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    // 1. Still resolving session
    if (loading) {
        return null;
    }

    // 2. Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // 3. Check permission against moduleList
    const allowedPaths = flattenAllowedPaths(user?.moduleList ?? []);

    // Root "/" is always allowed (it redirects via DynamicRedirect)
    if (location.pathname !== "/" && !isPathAllowed(location.pathname, allowedPaths)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 4. All good — render the protected layout
    return <Outlet />;
}
