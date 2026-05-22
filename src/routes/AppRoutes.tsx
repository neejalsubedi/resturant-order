import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainLayout = lazy(() => import("../components/layout/MainLayout"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.tsx"));
const Orders = lazy(() => import("../pages/orders/Order.tsx"));
const Tables = lazy(() => import("../pages/tables/Tables.tsx"));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index={true} element={<Dashboard />} />

                    {/* nested routes go here */}
                     <Route path="/orders" element={<Orders />} />
                     <Route path="/tables" element={<Tables />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Suspense>
    );
}