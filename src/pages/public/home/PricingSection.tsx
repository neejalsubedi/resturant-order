import { ArrowRight, Check } from "lucide-react";

type Props = {
    onRequestService: () => void;
};

const PricingSection = ({ onRequestService }: Props) => {
    return (
        <section id="pricing" className="border-t border-border">
            <div className="max-w-5xl mx-auto px-6 py-24 text-center">
                <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
                    Ready to upgrade your service?
                </h2>

                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    Tell us about your restaurant and we'll set you up with a tailored
                    demo within 24 hours.
                </p>

                <div className="mt-8">
                    <button
                        onClick={onRequestService}
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
                    >
                        Request our service
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
                    {[
                        "No setup fees",
                        "Cancel anytime",
                        "24/7 support",
                        "Free onboarding",
                    ].map((b) => (
                        <div key={b} className="inline-flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-accent" />
                            {b}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;