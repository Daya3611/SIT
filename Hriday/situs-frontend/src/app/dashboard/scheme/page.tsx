"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion, AnimatePresence } from "framer-motion"
import { ScanSearch, CheckCircle2, Info, ChevronRight, Zap, Target, Search, CreditCard, Banknote, ShieldCheck } from "lucide-react"

const SCHEMES = [
    {
        name: "Kisan Credit Card (Self-Service)",
        match: "Eligible Now",
        reason: "Active land registry and clean credit history detected via Aadhar linkage. Pre-approved for ₹2,50,000 credit limit at SBI Karnal Branch.",
        description: "Access up to ₹3,00,000 credit at 4% effective interest rate for seasonal cultivation expenses, post-harvest storage, and allied agricultural activities.",
        tags: ["Banking", "Priority"],
        type: "Loan"
    },
    {
        name: "PM-KISAN (₹6,000 Annual Support)",
        match: "Already Enrolled",
        reason: "Your 16th installment of ₹2,000 was credited on 10 Dec 2025 to your Aadhaar-linked SBI account. Next installment due: April 2026.",
        description: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families via Direct Benefit Transfer.",
        tags: ["Direct Benefit", "Active"],
        type: "Subsidy"
    },
    {
        name: "PM-Kisan Maandhan Yojana (Pension)",
        match: "High Match",
        reason: "Your land size (1.5 hectares, under 2 ha limit) matches the Small & Marginal Farmer pension criteria. Age eligibility confirmed.",
        description: "A voluntary contributory pension scheme providing ₹3,000 monthly after age 60. Monthly contribution of ₹55-200 matched equally by Central Government.",
        tags: ["Pension", "Security"],
        type: "Subsidy"
    },
    {
        name: "PM Fasal Bima Yojana (Crop Insurance)",
        match: "95% Likelihood",
        reason: "Your registered crops (Wheat, Mustard) are notification-eligible in Karnal district for Rabi 2025-26 season. Premium: only 1.5%.",
        description: "Comprehensive crop insurance at just 1.5% premium for Rabi crops. Covers yield loss, prevented sowing, post-harvest losses, and natural calamity damage.",
        tags: ["Insurance", "Seasonal"],
        type: "Subsidy"
    },
    {
        name: "PM-KUSUM Solar Pump Scheme",
        match: "85% Likelihood",
        reason: "Your tubewell-based irrigation in Karnal qualifies for 60% subsidy on a 5HP solar DC submersible pump, saving ₹45,000/year in diesel costs.",
        description: "Support for installing high-efficiency solar water pumps up to 7.5 HP with 60% government subsidy. Also enables extra income from selling surplus solar power.",
        tags: ["Solar", "Green"],
        type: "Subsidy"
    },
    {
        name: "Soil Health Card — Due for Renewal",
        match: "Action Required",
        reason: "Your last soil test report was generated in 2023. A new cycle is due in 2026. Free testing available at District Soil Lab, Karnal.",
        description: "Free comprehensive soil testing including pH levels, macro/micro nutrients, and organic content with expert fertilizer dosage recommendations.",
        tags: ["Soil Health", "Free"],
        type: "Subsidy"
    },
    {
        name: "Interest Subvention Scheme (4% Crop Loans)",
        match: "Eligible Now",
        reason: "Your existing KCC with SBI qualifies for the 2% interest subvention + 3% prompt repayment incentive, reducing your effective rate to 4%.",
        description: "Short-term crop loans up to ₹3 lakh at just 4% effective interest. Government provides 2% subvention with additional 3% bonus for timely repayment.",
        tags: ["Credit", "Interest"],
        type: "Loan"
    },
    {
        name: "e-NAM (Online Mandi Trading)",
        match: "Available",
        reason: "Karnal APMC mandi is e-NAM integrated. Register to get transparent online bidding and potentially 10-15% better prices for your Wheat & Mustard.",
        description: "Pan-India electronic trading portal with 1389+ connected mandis. Get real-time price discovery, online transparent bidding, and direct e-payments to your bank.",
        tags: ["Market", "Digital"],
        type: "Subsidy"
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
                                <span className="text-[10px] text-white/40 block">Cross-referencing with 15+ Central & State Schemes...</span>
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
                                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Found {SCHEMES.length} opportunities for FARMER-8821</div>
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
                                                <span className={`ml-auto text-[10px] font-black uppercase ${scheme.match === 'Eligible Now' || scheme.match === 'Already Enrolled' ? 'text-[#7c9473]' :
                                                        scheme.match === 'Action Required' ? 'text-[#c9a66b]' :
                                                            'text-[#546a7b]'
                                                    }`}>{scheme.match}</span>
                                            </div>
                                            <div className="text-[10px] font-bold text-neutral-400 italic leading-relaxed border-t border-neutral-200 pt-4">
                                                &ldquo;{scheme.reason}&rdquo;
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="flex-grow flex items-center justify-between px-8 py-5 bg-[#2d3429] text-white rounded-2xl group-hover:bg-[#7c9473] transition-all">
                                                <span className="text-[10px] font-black uppercase tracking-widest">
                                                    {scheme.match === 'Already Enrolled' ? 'View Status' : 'Start Application'}
                                                </span>
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
