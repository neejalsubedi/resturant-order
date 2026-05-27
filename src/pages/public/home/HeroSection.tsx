import { ArrowRight, Sparkles } from "lucide-react";

type Props = {
    onRequestService: () => void;
};

const HeroSection = ({ onRequestService }: Props) => {
    return (
        <section className="relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(600px circle at 20% 10%, oklch(0.72 0.18 50 / 0.25), transparent 50%), radial-gradient(800px circle at 90% 30%, oklch(0.72 0.18 50 / 0.15), transparent 60%)",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
                <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-6">
                    <Sparkles className="h-3 w-3 text-accent" />
                    Built for modern restaurants
                </div>

                <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl leading-[1.05]">
                    Run your restaurant
                    <br />
                    like the <span className="text-accent">front-of-house</span> never
                    sleeps.
                </h1>

                <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                    Nocta brings orders, tables, staff, inventory and reports into one
                    obsessively-designed system.
                </p>

                <div className="mt-10">
                    <button
                        onClick={onRequestService}
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
                    >
                        Request our service
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;