export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-sm space-y-6 p-8 rounded-xl border border-border bg-card">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
                    <p className="text-sm text-muted-foreground">
                        Register a new staff account
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="fullName">
                            Full name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="reg-username">
                            Username
                        </label>
                        <input
                            id="reg-username"
                            type="text"
                            placeholder="username"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="reg-password">
                            Password
                        </label>
                        <input
                            id="reg-password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-accent py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
