import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import AppNavbar from "./AppNavbar";
import AppSidebar from "@/components/layout/AppSidebar.tsx";
import {Toaster} from "sonner";


export default function MainLayout() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    <AppNavbar />

                    <main className="flex-1 p-6 md:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>

            <Toaster />
        </SidebarProvider>
    );
}