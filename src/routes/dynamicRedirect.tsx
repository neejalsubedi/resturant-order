import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/contextApi/AuthContext";
import { findFirstValidPath } from "@/routes/routeUtils";

/**
 * DynamicRedirect — used as the index route inside PrivateRoute.
 *
 * Redirects the user to the first path found in their moduleList tree.
 * Falls back to /unauthorized if no path is available.
 */
export const DynamicRedirect = () => {
    const { user } = useAuth();

    if (!user?.moduleList?.length) {
        return <Navigate to="/unauthorized" replace />;
    }

    const firstPath = findFirstValidPath(user.moduleList);
    return <Navigate to={firstPath ?? "/unauthorized"} replace />;
};
