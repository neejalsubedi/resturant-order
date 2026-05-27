import { useNavigate } from "react-router-dom";
import { ShieldOff } from "lucide-react";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6 text-center px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <ShieldOff className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">403</h1>
                    <p className="text-xl font-semibold">Access Denied</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        You don't have permission to view this page. Contact your
                        administrator if you think this is a mistake.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
                    >
                        Go back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}
