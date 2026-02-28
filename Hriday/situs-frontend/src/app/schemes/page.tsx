"use client"

import React, { useState } from "react"
import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ShieldCheck, FileText, Wallet, CreditCard, ChevronRight, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

const ALL_SCHEMES = [
    {
        id: "pm-kisan",
        category: "Direct Benefit",
        title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        description: "Income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
        eligibility: "Small and marginal farmers with landholdings up to 2 hectares.",
        benefits: ["Direct Bank Transfer", "₹6,000 Annual Credit"],
        type: "Central"
    },
    {
        id: "kcc",
        category: "Credit & Loan",
        title: "Kisan Credit Card (KCC) Scheme",
        description: "Provides farmers with timely access to credit for cultivation and other needs at low interest rates.",
        eligibility: "All farmers, individuals or joint borrowers, tenant farmers, and sharecroppers.",
        benefits: ["Interest Subvention (2-3%)", "Flexible Repayment", "Insurance Cover"],
        type: "Banking"
    },
    {
        id: "pmfby",
        category: "Insurance",
        title: "PM Fasal Bima Yojana (Crop Insurance)",
        description: "Comprehensive insurance cover against failure of crops, helping in stabilizing the income of farmers.",
        eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
        benefits: ["Low Premium", "Full Sum Insured", "Tech-based Claims"],
        type: "Central"
    },
    {
        id: "mechanization",
        category: "Equipment",
        title: "Sub-Mission on Agricultural Mechanization (SMAM)",
        description: "Subsidies for purchasing farm machinery like tractors, rotavators, and harvesters.",
        eligibility: "Individual farmers, SHGs, and FPOs.",
        benefits: ["40-50% Subsidy", "Custom Hiring Centers", "Modern Tech Access"],
        type: "Equipment"
    }
]

export default function SchemesHubPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const categories = ["All", "Direct Benefit", "Credit & Loan", "Insurance", "Equipment"]

    const filteredSchemes = ALL_SCHEMES.filter(scheme => {
        const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <main className="relative min-h-screen bg-[#fdfdfb] selection:bg-[#7c9473] selection:text-white pt-32">
            <NavBar />

            <div className="max-w-7xl mx-auto px-6 pb-24">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#c9a66b]/10 rounded-full border border-[#c9a66b]/20">
                        <span className="w-2 h-2 bg-[#c9a66b] rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c9a66b]">Centralized Scheme Hub</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-[#2d3429] tracking-tighter leading-[0.9]">
                        Aggregated Government <br /> Subsidies & Loans.
                    </h1>
                    <p className="text-neutral-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        Search and discover every agricultural scheme available from the Central and State governments in one unified repository.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={20} />
                        <input
                            type="text"
                            placeholder="Search by scheme name, keyword or department..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-neutral-100 rounded-3xl py-6 pl-16 pr-8 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7c9473]/20 focus:border-[#7c9473] transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-[#2d3429] text-white shadow-lg"
                                    : "bg-white text-neutral-400 border border-neutral-100 hover:border-[#7c9473]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredSchemes.map((scheme, i) => (
                        <motion.div
                            key={scheme.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[48px] p-10 border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-[#7c9473]/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#7c9473]">{scheme.category}</div>
                                    <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter leading-tight group-hover:text-[#7c9473] transition-colors">
                                        {scheme.title}
                                    </h3>
                                </div>
                                <div className="px-4 py-1.5 bg-neutral-50 rounded-full text-[8px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-100">
                                    {scheme.type}
                                </div>
                            </div>

                            <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8">
                                {scheme.description}
                            </p>

                            <div className="bg-[#f8f9f5] rounded-3xl p-8 mb-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#7c9473] shadow-sm">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Key Eligibility</div>
                                        <div className="text-xs font-bold text-[#2d3429]">{scheme.eligibility}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {scheme.benefits.map(benefit => (
                                        <div key={benefit} className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-neutral-600 border border-neutral-100">
                                            {benefit}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Link href="/dashboard" className="px-8 py-4 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] group-hover:bg-[#7c9473] transition-colors flex items-center gap-3">
                                    Apply Now <ArrowRight size={14} />
                                </Link>
                                <button className="p-4 text-neutral-300 hover:text-[#2d3429] transition-colors">
                                    <Info size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredSchemes.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="text-4xl opacity-20 mb-4">🔍</div>
                        <h3 className="text-2xl font-black text-neutral-300 uppercase tracking-tighter">No schemes matched your search</h3>
                        <p className="text-neutral-400 text-sm font-medium mt-2">Try a different keyword or category</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}
