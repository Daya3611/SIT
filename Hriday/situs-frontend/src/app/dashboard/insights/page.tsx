"use client"

import React from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import {
    BrainCircuit,
    TrendingUp,
    AlertTriangle,
    Droplets,
    Leaf,
    ArrowUpRight,
    Zap,
    Scale,
    ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

const INSIGHTS = [
    {
        title: "Loan Eligibility",
        value: "₹2.5 Lakhs",
        description: "Based on your credit profile and 1.5 Ha land holding.",
        icon: Scale,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Sustainability Score",
        value: "88/100",
        description: "Top 5% in Karnal region. Qualifies for Green Subsidies.",
        icon: Leaf,
        color: "text-[#7c9473]",
        bg: "bg-[#7c9473]/10"
    },
    {
        title: "Subsidy Match",
        value: "4 New",
        description: "Fresh state-level equipment subsidies detected for Wheat.",
        icon: Zap,
        color: "text-[#c9a66b]",
        bg: "bg-[#c9a66b]/10"
    },
]

export default function AIInsightsPage() {
    return (
        <DashboardLayout pageTitle="Financial Insights">
            <div className="space-y-10">
                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {INSIGHTS.map((insight, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${insight.bg} ${insight.color} flex items-center justify-center mb-6`}>
                                <insight.icon size={24} />
                            </div>
                            <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">{insight.title}</div>
                            <div className={`text-3xl font-black ${insight.color} mb-4 tracking-tighter`}>{insight.value}</div>
                            <p className="text-[10px] font-bold text-neutral-400 leading-relaxed uppercase tracking-tight">
                                {insight.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Recommendation Card */}
                    <div className="bg-[#2d3429] rounded-[48px] p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                            <BrainCircuit size={140} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 text-[#7c9473] mb-6">
                                <ShieldCheck size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">Recommended for You</span>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight">Solar Pump <span className="text-[#7c9473]">Subsidy</span></h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm">
                                Based on your irrigation needs, you qualify for an 80% subsidy on Solar Water Pumps. Application window closes in 12 days.
                            </p>
                            <div className="flex items-center gap-6">
                                <button className="px-8 py-4 bg-[#7c9473] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#6a8062] transition-all">
                                    Apply Now
                                </button>
                                <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Borrowing Power Simulation */}
                    <div className="bg-white rounded-[48px] p-12 border border-neutral-100 shadow-sm flex flex-col justify-center">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h3 className="text-lg font-black text-[#2d3429] uppercase tracking-tighter">Borrowing Capacity</h3>
                                <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-1">Multi-cycle analysis</p>
                            </div>
                            <TrendingUp className="text-[#7c9473]" size={32} />
                        </div>

                        <div className="flex items-end gap-3 h-48">
                            {[30, 45, 60, 40, 80, 55, 90].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={cn(
                                            "w-full rounded-full",
                                            i === 6 ? "bg-[#7c9473]" : "bg-neutral-100"
                                        )}
                                    />
                                    <span className="text-[8px] font-black text-neutral-300 uppercase">Q{i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-neutral-50 flex justify-between items-center">
                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Projected Growth</div>
                            <div className="flex items-center gap-2 text-[#7c9473] font-black">
                                <ArrowUpRight size={16} />
                                <span>+24.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
