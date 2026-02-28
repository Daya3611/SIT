"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion, AnimatePresence } from "framer-motion"
import { ScanSearch, CheckCircle2, Info, ChevronRight, Zap, Target, Search, CreditCard, Banknote, ShieldCheck } from "lucide-react"

const SCHEMES = [
    {
        name: "Kisan Credit Card (Self-Service)",
        match: "Eligible Now",
        reason: "Active land registry and clean credit history detected via Aadhar linkage.",
        description: "Access up to ₹3,00,000 credit at 4% interest rate for seasonal cultivation expenses.",
        tags: ["Banking", "Priority"],
        type: "Loan"
    },
    {
        name: "PM-Kisan Maandhan Yojana",
        match: "High Match",
        reason: "Your land size (under 2 hectares) matches the Small & Marginal Farmer pension criteria.",
        description: "A voluntary and contributory pension scheme providing ₹3,000 monthly after age 60.",
        tags: ["Pension", "Security"],
        type: "Subsidy"
    },
    {
        name: "Micro-Irrigation Solar Pump Grant",
        match: "85% Likelihood",
        reason: "Registration of 'Sugarcane' in dryland region qualifies you for 90% solar pump subsidy.",
        description: "Support for installing high-efficiency solar water pumps to reduce diesel costs.",
        tags: ["Equipment", "Green"],
        type: "Subsidy"
    },
    {
        name: "Cattle & Livestock Extension Loan",
        match: "Additional Info Needed",
        reason: "Verify your dairy production volume to unlock priority livestock credit lines.",
        description: "Term loans for purchasing high-yield livestock and constructing animal sheds.",
        tags: ["Livestock", "Expansion"],
        type: "Loan"
    }
]

export default function SchemeEligibilityPage() {
    const [isScanning, setIsScanning] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const handleScan = () => {
        setIsScanning(true)
        setShowResults(false)
        setTimeout(() => {
            setIsScanning(false)
            setShowResults(true)
        }, 3000)
    }

    return (
        <DashboardLayout pageTitle="Loan & Subsidy Navigator">
            <div className="space-y-10">
                {/* Advanced Eligibility Scanner */}
                <div className="bg-[#2d3429] rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12">
                        <Banknote size={240} />
                    </div>

                    <div className="max-w-xl relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/10">
                            <span className="w-2 h-2 bg-[#7c9473] rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">wAG006 Navigator Engine</span>
                        </div>

                        <div>
                            <h3 className="text-4xl font-black tracking-tighter leading-tight">Match Your Profile to <br /> Guaranteed Subsidies.</h3>
                            <p className="text-white/40 mt-4 text-sm font-medium leading-relaxed">
                                Our engine cross-references your Land Survey Records, Crop Life-cycles, and Credit Score
                                against the latest Central & State gazettes to find verified funding opportunities.
                            </p>
                        </div>

                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className="px-12 py-5 bg-[#7c9473] text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-[#6a8062] transition-all flex items-center gap-4 shadow-xl disabled:opacity-50"
                        >
                            {isScanning ? "Running Cross-Verification..." : "Scan My Match Eligibility"}
                            {!isScanning && <ScanSearch size={18} />}
                        </button>
                    </div>

                    {/* Scanning Animation Overlay */}
                    {isScanning && (
                        <div className="absolute inset-0 bg-[#2d3429]/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-6">
                            <motion.div
                                className="w-24 h-24 border-4 border-[#7c9473] border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="text-center">
                                <span className="text-xs font-black uppercase tracking-widest block mb-2">Analyzing Farmer Profile</span>
                                <span className="text-[10px] text-white/40 block">Connecting to Kisan Data Hub...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <AnimatePresence>
                    {showResults && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
                                <h4 className="text-2xl font-black text-[#2d3429] tracking-tighter">Verified Funding Matches</h4>
                                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Found 4 opportunities</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {SCHEMES.map((scheme, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-[40px] p-10 border border-neutral-100 shadow-sm flex flex-col group hover:shadow-2xl hover:border-[#7c9473]/20 transition-all duration-500"
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="space-y-3">
                                                <div className="flex gap-2">
                                                    {scheme.tags.map(tag => (
                                                        <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-[#f8f9f5] rounded-lg text-[#7c9473] border border-[#7c9473]/10">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h4 className="text-xl font-black text-[#2d3429] leading-tight group-hover:text-[#7c9473] transition-colors">{scheme.name}</h4>
                                            </div>
                                            <div className={`p-4 rounded-2xl ${scheme.type === 'Loan' ? 'bg-[#546a7b]/10 text-[#546a7b]' : 'bg-[#c9a66b]/10 text-[#c9a66b]'}`}>
                                                {scheme.type === 'Loan' ? <Banknote size={20} /> : <CreditCard size={20} />}
                                            </div>
                                        </div>

                                        <p className="text-neutral-500 text-xs leading-relaxed mb-8 flex-grow">
                                            {scheme.description}
                                        </p>

                                        <div className="p-6 bg-[#f8f9f5] rounded-3xl mb-10 space-y-4 border border-neutral-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 bg-[#7c9473] text-white rounded-lg">
                                                    <CheckCircle2 size={12} />
                                                </div>
                                                <span className="text-[10px] font-black text-[#2d3429] uppercase tracking-tighter">Probability Score</span>
                                                <span className="ml-auto text-[10px] font-black text-[#7c9473] uppercase">{scheme.match}</span>
                                            </div>
                                            <div className="text-[10px] font-bold text-neutral-400 italic leading-relaxed border-t border-neutral-200 pt-4">
                                                "{scheme.reason}"
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="flex-grow flex items-center justify-between px-8 py-5 bg-[#2d3429] text-white rounded-2xl group-hover:bg-[#7c9473] transition-all">
                                                <span className="text-[10px] font-black uppercase tracking-widest">Start Application</span>
                                                <ChevronRight size={16} />
                                            </button>
                                            <button className="p-5 border border-neutral-100 rounded-2xl text-neutral-300 hover:text-[#2d3429] transition-colors">
                                                <Info size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showResults && !isScanning && (
                    <div className="flex flex-col items-center justify-center py-24 bg-neutral-50 rounded-[48px] border-2 border-dashed border-neutral-200">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-300 mb-6">
                            <Target size={32} />
                        </div>
                        <h4 className="text-lg font-black text-neutral-300 uppercase tracking-[0.4em]">Match Scanner Offline</h4>
                        <p className="text-neutral-400 text-[10px] font-bold mt-2">Start the cross-verification scan above to see funding opportunities.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
