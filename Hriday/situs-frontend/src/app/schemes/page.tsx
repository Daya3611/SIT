"use client"

import React, { useState } from "react"
import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ShieldCheck, FileText, Wallet, CreditCard, ChevronRight, ArrowRight, Info } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"

const ALL_SCHEMES = [
    {
        id: "pm-kisan",
        category: "Direct Benefit",
        title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        description: "Income support of ₹6,000 per year in three equal installments of ₹2,000 every four months, directly transferred to Aadhaar-seeded bank accounts via DBT.",
        eligibility: "All landholding farmer families (excluding institutional landholders, income tax payers, and government employees).",
        benefits: ["Direct Bank Transfer", "₹6,000 Annual Credit", "Three ₹2,000 Installments"],
        type: "Central",
        launchYear: 2019,
        beneficiaries: "11.8 Cr Farmers"
    },
    {
        id: "kcc",
        category: "Credit & Loan",
        title: "Kisan Credit Card (KCC) Scheme",
        description: "Credit up to ₹3 lakh at 7% interest with 2% subvention and 3% prompt repayment incentive — effective rate just 4% per annum.",
        eligibility: "All farmers, tenant farmers, sharecroppers, SHGs, JLGs. Age 18-75 years. No collateral up to ₹1.60 lakh.",
        benefits: ["Effective 4% Interest", "Flexible Repayment", "Insurance Cover", "ATM-cum-Credit Card"],
        type: "Banking",
        launchYear: 1998,
        beneficiaries: "7.5 Cr Cards"
    },
    {
        id: "pmfby",
        category: "Insurance",
        title: "PM Fasal Bima Yojana (Crop Insurance)",
        description: "Comprehensive crop insurance — 2% premium for Kharif, 1.5% for Rabi, 5% for commercial crops. Covers yield loss, prevented sowing, and post-harvest losses.",
        eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas. Voluntary enrollment.",
        benefits: ["Low Premium (1.5-5%)", "Full Sum Insured", "Tech-based Claims", "Post-Harvest Cover (14 days)"],
        type: "Central",
        launchYear: 2016,
        beneficiaries: "4 Cr Farmers/yr"
    },
    {
        id: "smam",
        category: "Equipment",
        title: "Sub-Mission on Agricultural Mechanization (SMAM)",
        description: "Subsidies of 40-80% for purchasing farm machinery like tractors, rotavators, and harvesters. Includes Custom Hiring Centres and Farm Machinery Banks.",
        eligibility: "Individual farmers, SHGs, FPOs, Cooperative Societies. Priority for SC/ST, women, and small & marginal farmers.",
        benefits: ["40-80% Subsidy", "Custom Hiring Centers", "SC/ST 50% Subsidy", "Modern Tech Access"],
        type: "Central",
        launchYear: 2014,
        beneficiaries: "5.6 Lakh Farmers"
    },
    {
        id: "soil-health-card",
        category: "Soil Health",
        title: "Soil Health Card Scheme",
        description: "Detailed soil nutrient status reports every 3 years with pH, organic content, and fertilizer dosage recommendations to improve yield and reduce costs.",
        eligibility: "All farmers across India. Free registration. Soil samples tested in government-approved labs.",
        benefits: ["Free Soil Testing", "Nutrient Recommendations", "Improved Yield", "pH & Organic Analysis"],
        type: "Central",
        launchYear: 2015,
        beneficiaries: "24.74 Cr Cards"
    },
    {
        id: "pkvy",
        category: "Organic",
        title: "Paramparagat Krishi Vikas Yojana (PKVY)",
        description: "₹31,500 per hectare over 3 years for transitioning to organic farming, using cluster-based approach with eco-friendly technologies.",
        eligibility: "All farmers and institutions with up to 2 hectares landholding. Cluster-based approach.",
        benefits: ["₹31,500/ha over 3 Years", "Organic Certification", "Jaivik Kheti Portal Access", "Chemical-Free Produce"],
        type: "Central",
        launchYear: 2015,
        beneficiaries: "25.3 Lakh Farmers"
    },
    {
        id: "enam",
        category: "Market Access",
        title: "e-NAM (National Agriculture Market)",
        description: "Pan-India electronic trading portal connecting 1389+ APMC mandis for transparent online bidding, real-time price discovery, and direct farmer-to-buyer transactions.",
        eligibility: "All farmers. Free registration via APMC-linked mandis across 23 States and 4 UTs.",
        benefits: ["Online Transparent Bidding", "Better Price Discovery", "Reduced Middlemen", "e-Payment to Bank"],
        type: "Central",
        launchYear: 2016,
        beneficiaries: "1.77 Cr Farmers"
    },
    {
        id: "pm-kisan-maandhan",
        category: "Direct Benefit",
        title: "PM-Kisan Maandhan Yojana (Pension)",
        description: "Voluntary pension scheme — monthly contribution of ₹55-200 with equal government match. ₹3,000/month pension after age 60.",
        eligibility: "Small & marginal farmers with up to 2 hectares land, aged 18-40 years.",
        benefits: ["₹3,000/month After 60", "Govt Matches Contribution", "Low ₹55-200/month Premium", "Family Pension"],
        type: "Central",
        launchYear: 2019,
        beneficiaries: "23.38 Lakh"
    },
    {
        id: "rkvy",
        category: "Direct Benefit",
        title: "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
        description: "Flexible state-level agriculture development programs with 60:40 Centre-State funding, focusing on agri-entrepreneurship, innovation, and infrastructure.",
        eligibility: "State Governments, Agri Start-ups, FPOs, and individual farmers.",
        benefits: ["Flexible State Planning", "Agri Start-up Incubation", "Post-Harvest Infrastructure", "60:40 Funding"],
        type: "Central",
        launchYear: 2007,
        beneficiaries: "All States & UTs"
    },
    {
        id: "nfsm",
        category: "Direct Benefit",
        title: "National Food Security Mission (NFSM)",
        description: "Increases production of Rice, Wheat, Pulses, Coarse Cereals, and Commercial Crops through area expansion and technology dissemination across 644 districts.",
        eligibility: "All farmers in target districts growing mission crops.",
        benefits: ["Seed Distribution Subsidy", "Farm Machinery Subsidy", "Demo Plots", "Improved Seed Varieties"],
        type: "Central",
        launchYear: 2007,
        beneficiaries: "644 Districts"
    },
    {
        id: "mif",
        category: "Equipment",
        title: "Micro Irrigation Fund (MIF)",
        description: "₹10,000 Crore NABARD corpus fund promoting drip and sprinkler irrigation systems with 30-70% water savings and higher crop yields.",
        eligibility: "All farmers (via state government programs). Suitable for drip, sprinkler, and rain-gun systems.",
        benefits: ["Subsidized Irrigation", "30-70% Water Savings", "Higher Crop Yield", "NABARD Backed"],
        type: "NABARD",
        launchYear: 2018,
        beneficiaries: "1.42 Cr Hectares"
    },
    {
        id: "pm-kusum",
        category: "Solar & Energy",
        title: "PM-KUSUM (Solar Energy for Farmers)",
        description: "60% subsidy on solar pumps up to 7.5 HP. Also supports solarization of grid-connected pumps and solar power plants on barren land.",
        eligibility: "Individual farmers, Farmer Groups, FPOs, Water User Associations.",
        benefits: ["60% Subsidy on Solar Pumps", "Extra Income from Solar", "Reduced Diesel Costs", "25-Year Equipment Life"],
        type: "Central",
        launchYear: 2019,
        beneficiaries: "35 Lakh Target"
    },
    {
        id: "agri-clinics",
        category: "Credit & Loan",
        title: "Agri-Clinics & Agri-Business Centres (ACABC)",
        description: "Free 2-month training + 36-44% subsidy on bank loans for agriculture graduates to set up agri-ventures offering soil testing, crop advisory, and market linkage.",
        eligibility: "Agriculture Graduates / Diploma holders. No age limit. Free residential training by MANAGE.",
        benefits: ["Free 2-Month Training", "36-44% Loan Subsidy", "Loan up to ₹20L (Individual)", "Loan up to ₹1Cr (Group)"],
        type: "Central",
        launchYear: 2002,
        beneficiaries: "71,000+ Trained"
    },
    {
        id: "nlm",
        category: "Equipment",
        title: "National Livestock Mission (NLM)",
        description: "50% capital subsidy for livestock entrepreneurship — poultry, sheep, goat, piggery farms, and feed/fodder development with breed improvement programs.",
        eligibility: "Individual farmers, entrepreneurs, SHGs, FPOs, and Section 8 Companies.",
        benefits: ["50% Capital Subsidy", "Breed Improvement", "Feed & Fodder Support", "Skill Training"],
        type: "Central",
        launchYear: 2014,
        beneficiaries: "15 Lakh+"
    },
    {
        id: "interest-subvention",
        category: "Credit & Loan",
        title: "Interest Subvention Scheme (ISS)",
        description: "Short-term crop loans up to ₹3 lakh at 7% with 2% govt subvention. Additional 3% bonus for prompt repayment — effective rate just 4%.",
        eligibility: "All farmers via Scheduled Commercial Banks, RRBs, and Cooperative Banks.",
        benefits: ["Effective 4% Interest", "2% Govt Subvention", "3% Prompt Repayment Bonus", "Post-Harvest Loans"],
        type: "Central",
        launchYear: 2006,
        beneficiaries: "All Crop Loans"
    }
]

export default function SchemesHubPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const categories = ["All", "Direct Benefit", "Credit & Loan", "Insurance", "Equipment", "Organic", "Market Access", "Soil Health", "Solar & Energy"]

    const filteredSchemes = ALL_SCHEMES.filter(scheme => {
        const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <ProtectedRoute>
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
                        <div className="flex items-center justify-center gap-6 text-xs font-bold text-neutral-400">
                            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#7c9473] rounded-full animate-pulse" /> {ALL_SCHEMES.length} Active Schemes</span>
                            <span>•</span>
                            <span>Last Updated: Feb 2026</span>
                        </div>
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

                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-xs font-black uppercase tracking-widest text-neutral-400">
                            Showing {filteredSchemes.length} of {ALL_SCHEMES.length} schemes
                        </div>
                        {selectedCategory !== "All" && (
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className="text-[10px] font-black uppercase tracking-widest text-[#7c9473] hover:underline"
                            >
                                Clear Filter ✕
                            </button>
                        )}
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredSchemes.map((scheme, i) => (
                            <motion.div
                                key={scheme.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-[48px] p-10 border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-[#7c9473]/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-[#7c9473]">{scheme.category}</div>
                                        <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter leading-tight group-hover:text-[#7c9473] transition-colors">
                                            {scheme.title}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="px-4 py-1.5 bg-neutral-50 rounded-full text-[8px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-100">
                                            {scheme.type}
                                        </div>
                                        <div className="text-[9px] font-bold text-neutral-300">Since {scheme.launchYear}</div>
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
                                    {scheme.beneficiaries && (
                                        <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Beneficiaries:</span>
                                            <span className="text-xs font-black text-[#7c9473]">{scheme.beneficiaries}</span>
                                        </div>
                                    )}
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
        </ProtectedRoute>
    )
}
