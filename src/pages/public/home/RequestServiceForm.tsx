import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";


type Props = {
    onClose: () => void;
};

const RequestServiceForm = ({ onClose }: Props) => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        const name = fd.get("name");

        toast.success("Request received", {
            description: `Thanks${
                name ? `, ${name}` : ""
            }! Our team will reach out within 24h.`,
        });

        onClose();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* USER DETAILS */}
            <div>
                <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-accent">
                        Your Details
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Hassan Ali"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Your role</Label>
                        <Input
                            id="role"
                            name="role"
                            placeholder="Owner / Manager"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@restaurant.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="+977 98XXXXXXXX"
                        />
                    </div>
                </div>
            </div>

            {/* RESTAURANT DETAILS */}
            <div>
                <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-accent">
                        Restaurant Details
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="restaurant">
                            Restaurant name
                        </Label>

                        <Input
                            id="restaurant"
                            name="restaurant"
                            required
                            placeholder="The Copper Spoon"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cuisine">
                            Cuisine type
                        </Label>

                        <Input
                            id="cuisine"
                            name="cuisine"
                            placeholder="Italian, Sushi, Nepali..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tables">
                            Number of tables
                        </Label>

                        <Input
                            id="tables"
                            name="tables"
                            type="number"
                            min={1}
                            placeholder="24"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">
                            Address
                        </Label>

                        <Input
                            id="address"
                            name="address"
                            placeholder="Kathmandu, Nepal"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">
                            Additional notes
                        </Label>

                        <Textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            placeholder="Tell us about your restaurant or current system..."
                        />
                    </div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition"
                >
                    Submit request
                </button>
            </div>
        </form>
    );
};

export default RequestServiceForm;