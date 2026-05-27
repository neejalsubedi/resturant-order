import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import AppRoutes from "@/routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/contextApi/AuthContext";

export default function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {/*
                 * AuthProvider must be INSIDE BrowserRouter so that
                 * route guards (PublicRoute, PrivateRoute) can call
                 * useNavigate / useLocation without errors.
                 */}
                <AuthProvider>
                    <AppRoutes />
                    <Toaster />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}