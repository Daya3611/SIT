"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import { Sprout, Calendar, Package, ArrowRight, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const LIFECYCLE_STEPS = [
    { name: "Planted", status: "completed" },
    { name: "Growing", status: "current" },
    { name: "Harvested", status: "upcoming" },
    { name: "Sold", status: "upcoming" },
    { name: "Shipped", status: "upcoming" },
    { name: "Delivered", status: "upcoming" },
]

export default function CropManagementPage() {
    const [activeTab, setActiveTab] = useState("active")

    return (
        <DashboardLayout pageTitle="Crop Management">
            <div className="space-y-10">
                <div className="flex justify-between items-center">
                    <div className="flex bg-white p-1 rounded-2xl border border-neutral-100 shadow-sm">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                activeTab === "active" ? "bg-[#7c9473] text-white" : "text-neutral-400 hover:text-[#2d3429]"
                            )}
                        >
                            Active_Crops
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                activeTab === "history" ? "bg-[#7c9473] text-white" : "text-neutral-400 hover:text-[#2d3429]"
                            )}
                        >
                            Archive
                        </button>
                    </div>

                    <button className="px-8 py-4 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7c9473] transition-all flex items-center gap-3">
                        <Sprout size={16} /> Register New Crop
                    </button>
                </div>

                {/* Active Crop Detail View */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Crop Metadata Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[40px] p-10 border border-neutral-100 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <Sprout size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="bg-[#9b7e6b]/10 text-[#9b7e6b] w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                    ID: #CP-8821
                                </div>
                                <h3 className="text-3xl font-black text-[#2d3429] tracking-tighter uppercase mb-2">Wheat (Sonalika)</h3>
                                <div className="flex items-center gap-4 text-neutral-400 font-bold text-xs uppercase tracking-tight mb-10">
                                    Parcel: Survey 144/2A
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#f8f9f5] flex items-center justify-center text-[#7c9473]">
                                            <Calendar size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Planted Date</span>
                                            <span className="text-sm font-bold text-[#2d3429]">12 Oct 2025</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#f8f9f5] flex items-center justify-center text-[#546a7b]">
                                            <Package size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Expected Harvest</span>
                                            <span className="text-sm font-bold text-[#2d3429]">15 March 2026</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-10 border-t border-neutral-50">
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Growth Cycle Progress</span>
                                        <span className="text-xs font-black text-[#7c9473]">75%</span>
                                    </div>
                                    <div className="h-3 w-full bg-neutral-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "75%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#7c9473] to-[#9b7e6b]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Lifecycle Timeline */}
                    <div className="lg:col-span-2 bg-[#2d3429] rounded-[48px] p-12 text-white relative overflow-hidden flex flex-col justify-center shadow-2xl">
                        {/* Visual connectors */}
                        <div className="absolute left-24 top-1/2 -translate-y-1/2 w-[calc(100%-192px)] h-0.5 bg-white/10 hidden md:block" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
                            {LIFECYCLE_STEPS.map((step, index) => {
                                const isCompleted = step.status === "completed"
                                const isCurrent = step.status === "current"

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex md:flex-col items-center gap-6 md:gap-8 relative"
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-20",
                                            isCompleted ? "bg-[#7c9473] text-white" : isCurrent ? "bg-[#c9a66b] text-white scale-125 shadow-2xl shadow-[#c9a66b]/20" : "bg-white/5 text-white/30"
                                        )}>
                                            {isCompleted ? <CheckCircle2 size={24} /> : isCurrent ? <Sprout size={24} /> : <Circle size={10} strokeWidth={4} />}

                                            {isCurrent && (
                                                <motion.div
                                                    className="absolute -inset-2 border-2 border-dashed border-[#c9a66b] rounded-[20px]"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                />
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <div className={cn(
                                                "text-[10px] font-black uppercase tracking-[0.2em]",
                                                isCurrent ? "text-[#c9a66b]" : isCompleted ? "text-[#7c9473]" : "text-white/20"
                                            )}>
                                                {step.name}
                                            </div>
                                            {isCurrent && (
                                                <div className="text-[8px] font-bold text-white/40 uppercase mt-2 opacity-100 hidden md:block">Active Stage</div>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="max-w-xs">
                                <h4 className="text-lg font-bold mb-2">Next Step: Harvest</h4>
                                <p className="text-white/40 text-xs leading-relaxed">
                                    Verify quality testing and prepare shipment labels once growth cycle hits 100%.
                                </p>
                            </div>
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#7c9473] flex items-center gap-3 transition-all">
                                Update Lifecycle <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
