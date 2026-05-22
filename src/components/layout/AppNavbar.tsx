import { SidebarTrigger } from "@/components/ui/sidebar";

export default function  AppNavbar() {
    return (
        <header className="h-14 flex items-center gap-3 border-b border-border px-6 md:px-8 sticky top-0 bg-background/80 backdrop-blur z-10">
            <SidebarTrigger />

            <div className="h-5 w-px bg-border" />

            <div className="text-sm text-muted-foreground">
                Front of House · Live
            </div>

            <div className="ml-auto flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">
          All systems normal
        </span>
            </div>
        </header>
    );
}