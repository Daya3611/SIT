import { NavBar } from "@/components/NavBar"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { TechTrustSection } from "@/components/landing/TechTrustSection"
import { Footer } from "@/components/Footer"

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-[#fdfdfb] selection:bg-[#7c9473] selection:text-white pt-20">
            <NavBar />

            {/* Header Profile */}
            <div className="bg-[#2d3429] py-32 px-6 rounded-b-[64px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7c9473] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="text-[10px] font-black text-[#7c9473] uppercase tracking-[0.5em] mb-6">Our Mission</div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-10">
                        Building Trust in<br />Agricultural Trade.
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        DBT-Connect eliminates payment uncertainty for farmers by tokenizing the crop lifecycle and mapping it securely to smart contracts, ensuring real-time visibility from planting to final payment.
                    </p>
                </div>
            </div>

            <HowItWorksSection />
            <FeaturesSection />
            <TechTrustSection />

        </main>
    )
}
