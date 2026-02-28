import React from "react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-[#2d3429] py-16 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="text-white font-black tracking-tighter text-2xl flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#7c9473] rounded-lg"></div>
                        DBT-Connect
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">
                        Building a foundation of trust for the global agricultural supply chain through tamper-proof data.
                    </p>
                </div>

                <div className="space-y-6">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">Platform</h4>
                    <ul className="space-y-3 text-white/40 text-sm font-medium">
                        <li><Link href="/dashboard" className="hover:text-[#7c9473] transition-colors">Farmer Dashboard</Link></li>
                        <li><Link href="/marketplace" className="hover:text-[#7c9473] transition-colors">Marketplace</Link></li>
                        <li><Link href="#" className="hover:text-[#7c9473] transition-colors">Buyer Verification</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">Company</h4>
                    <ul className="space-y-3 text-white/40 text-sm font-medium">
                        <li><Link href="/about" className="hover:text-[#7c9473] transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-[#7c9473] transition-colors">Contact</Link></li>
                        <li><Link href="#" className="hover:text-[#7c9473] transition-colors">Case Studies</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">Trust</h4>
                    <ul className="space-y-3 text-white/40 text-sm font-medium">
                        <li><Link href="#" className="hover:text-[#7c9473] transition-colors">Security Anchor</Link></li>
                        <li><Link href="#" className="hover:text-[#7c9473] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-[#7c9473] transition-colors">Network Status</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-6xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                    &copy; 2026 // ALL_SYSTEMS_OPERATIONAL
                </div>
                <div className="flex gap-8 text-white/20 font-black text-[10px] tracking-widest">
                    <span>SECURED_BY_BLOCKCHAIN</span>
                    <span>POWERED_BY_AI</span>
                </div>
            </div>
        </footer>
    )
}
