import type { LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

const FeatureCard = ({ icon: Icon, title, desc }: Props) => {
    return (
        <div className="bg-background p-8 hover:bg-card transition">
            <div className="h-10 w-10 rounded-md bg-accent/10 text-accent flex items-center justify-center mb-5">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="font-display text-lg font-semibold">{title}</h3>

            <p className="text-sm text-muted-foreground mt-2">{desc}</p>
        </div>
    );
};

export default FeatureCard;