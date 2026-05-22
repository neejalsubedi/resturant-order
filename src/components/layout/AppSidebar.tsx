import {
    LayoutDashboard,
    ClipboardList,
    Grid3x3,
    Users,
    Package,
    BarChart3,
    Flame,
    Smartphone,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";

const items = [
    { title: "dashboard", url: "/", icon: LayoutDashboard },
    { title: "orders", url: "/orders", icon: ClipboardList },
    { title: "Tables", url: "/tables", icon: Grid3x3 },
    { title: "Staff", url: "/staff", icon: Users },
    { title: "Inventory", url: "/inventory", icon: Package },
    { title: "Reports", url: "/reports", icon: BarChart3 },
    { title: "Mobile preview", url: "/mobile", icon: Smartphone },
];

export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon">

            {/* Header */}
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-2 px-2 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                        <Flame className="h-5 w-5" />
                    </div>

                    <div className="group-data-[collapsible=icon]:hidden">
                        <div className="font-display text-base font-semibold leading-none">
                            NOCTA
                        </div>
                        <div className="text-[11px] text-muted-foreground tracking-wider uppercase mt-0.5">
                            Order System
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            {/* Menu */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Operations</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className={"space-y-2"}>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild={false}>
                                        <NavLink
                                            to={item.url}

                                            // className={({ isActive }) =>
                                            //     `flex items-center gap-2 transition-colors ${
                                            //         isActive
                                            //             ? "text-accent font-medium"
                                            //             : "text-muted-foreground hover:text-foreground"
                                            //     }`
                                            // }
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "flex items-center gap-2 bg-accent text-white px-2 py-1 rounded-md"
                                                    : "flex items-center gap-2 text-muted-foreground hover:text-foreground"
                                            }
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-sidebar-border">
                <div className="flex items-center gap-2 px-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        HA
                    </div>

                    <div className="group-data-[collapsible=icon]:hidden text-xs">
                        <div className="font-medium">Hassan Ali</div>
                        <div className="text-muted-foreground">Admin</div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}