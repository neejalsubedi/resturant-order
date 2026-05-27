import { Flame } from "lucide-react";

type Props = {
    onRequestService: () => void;
};

const Navbar = ({ onRequestService }: Props) => {
    return (
        <header className="sticky top-0 z-20 backdrop-blur bg-background/70 border-b border-border">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                        <Flame className="h-5 w-5" />
                    </div>

                    <div className="font-display font-semibold tracking-tight">
                        NOCTA
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition">
                        Features
                    </a>

                    <a href="#pricing" className="hover:text-foreground transition">
                        Pricing
                    </a>
                </nav>

                <button
                    onClick={onRequestService}
                    className="hidden sm:inline-flex text-sm px-4 py-2 rounded-md bg-accent text-accent-foreground font-medium hover:opacity-90"
                >
                    Request service
                </button>
            </div>
        </header>
    );
};

export default Navbar;