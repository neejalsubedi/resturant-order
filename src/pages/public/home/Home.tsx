import { useState } from "react";
import Navbar from "@/pages/public/home/Navbar.tsx";
import HeroSection from "@/pages/public/home/HeroSection.tsx";
import FeaturesSection from "@/pages/public/home/FeaturesSection.tsx";
import PricingSection from "@/pages/public/home/PricingSection.tsx";
import Footer from "@/pages/public/home/Footer.tsx";
import Modal from "@/components/ui/Modal.tsx";
import RequestServiceForm from "@/pages/public/home/RequestServiceForm.tsx";



const Home = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar onRequestService={() => setOpen(true)} />

            <HeroSection onRequestService={() => setOpen(true)} />

            <FeaturesSection />

            <PricingSection onRequestService={() => setOpen(true)} />

            <Footer />

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Request our service"
                size="medium"
            >
                <RequestServiceForm
                    onClose={() => setOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default Home;