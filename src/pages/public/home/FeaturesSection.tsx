import FeatureCard from "./FeatureCard";
import { features } from "./data";

const FeaturesSection = () => {
    return (
        <section
            id="features"
            className="border-t border-border bg-card/30"
        >
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="max-w-2xl">
                    <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                        What's inside
                    </div>

                    <h2 className="font-display text-4xl font-semibold tracking-tight">
                        Everything you need.
                        <br />
                        Nothing you don't.
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            desc={feature.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;