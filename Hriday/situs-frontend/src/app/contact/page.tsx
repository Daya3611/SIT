import { CTASection } from "@/components/landing/CTASection"
import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"

export default function ContactPage() {
    return (
        <main className="relative min-h-screen bg-[#fdfdfb] selection:bg-[#7c9473] selection:text-white pt-32 pb-20">
            <NavBar />
            <CTASection />

            <div className="max-w-6xl mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm text-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#7c9473] mb-4">Farmer Support</div>
                        <h4 className="text-xl font-black text-[#2d3429] mb-2">+91 1800 123 4567</h4>
                        <p className="text-neutral-400 text-xs font-bold">Mon-Sat, 9am - 6pm IST</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm text-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#c9a66b] mb-4">Business Email</div>
                        <h4 className="text-xl font-black text-[#2d3429] mb-2">hello@agripaychain.com</h4>
                        <p className="text-neutral-400 text-xs font-bold">Responses within 24 hours</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm text-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#546a7b] mb-4">Headquarters</div>
                        <h4 className="text-lg font-black text-[#2d3429] mb-2">Agri Tech Park, Block B</h4>
                        <p className="text-neutral-400 text-xs font-bold">Pune, Maharashtra 411045</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
