import { Flame } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-accent" />

                    <span>© 2026 Nocta. Crafted for restaurants.</span>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-foreground">
                        Privacy
                    </a>

                    <a href="#" className="hover:text-foreground">
                        Terms
                    </a>

                    <a href="#" className="hover:text-foreground">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;