import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// ─── Public pages ─────────────────────────────────────────────────────────────
const Home = lazy(() => import("@/pages/public/home/Home"));
const Login = lazy(() => import("@/pages/public/authPages/Login"));
const Register = lazy(() => import("@/pages/public/authPages/Register"));
const Unauthorized = lazy(() => import("@/pages/public/Unauthorized"));

// ─── Private pages ────────────────────────────────────────────────────────────
const MainLayout = lazy(() => import("@/components/layout/MainLayout"));
const Dashboard = lazy(() => import("@/pages/private/dashboard/Dashboard"));
const Orders = lazy(() => import("@/pages/private/orders/Order"));
const Tables = lazy(() => import("@/pages/private/tables/Tables"));
const Staff = lazy(() => import("@/pages/private/staff/Staff"));

// ─── Route guards ─────────────────────────────────────────────────────────────
import PublicRoute from "@/routes/PublicRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import { DynamicRedirect } from "@/routes/dynamicRedirect";

// ─── Loading fallback ─────────────────────────────────────────────────────────
function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="h-8 w-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
        </div>
    );
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>

                {/* ── Public routes (redirect away if already authenticated) ── */}
                <Route element={<PublicRoute />}>
                    <Route index={true} element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* ── Standalone public page ─────────────────────────────── */}
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* ── Private routes (auth + permission check) ───────────── */}
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>

                        {/*
                         * Index: redirect to the first path the user has access to.
                         * e.g. if moduleList[0].path === "/dashboard" → goes there.
                         */}
                        <Route index element={<DynamicRedirect />} />

                        {/* Core pages */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/tables" element={<Tables />} />
                        <Route path="/staff" element={<Staff />} />

                        {/*
                         * Add future module sub-routes here, e.g.:
                         * <Route path="/staff/add"      element={<StaffAdd />} />
                         * <Route path="/staff/:id/edit" element={<StaffEdit />} />
                         *
                         * They will be automatically allowed if the parent path
                         * ("/staff") is present in the user's moduleList (prefix match).
                         */}

                    </Route>
                </Route>

                {/* ── Catch-all: redirect to root ────────────────────────── */}
                <Route path="*" element={<DynamicRedirect />} />

            </Routes>
        </Suspense>
    );
}