"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, CalendarRange, Radar, Eye, BrainCircuit, ScanSearch } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            title: "Secure Land Record Upload",
            description: "Upload your land documents once. They are anchored to a tamper-proof ledger for permanent trust.",
            icon: ShieldCheck,
            color: "text-[#7c9473]"
        },
        {
            title: "Crop Lifecycle Tracking",
            description: "Log every stage of your crop's growth. Build a verifiable history that buyers can trust.",
            icon: CalendarRange,
            color: "text-[#9b7e6b]"
        },
        {
            title: "Real-Time Shipment Tracking",
            description: "Monitor your produce from farm gate to factory door with live GPS and status updates.",
            icon: Radar,
            color: "text-[#546a7b]"
        },
        {
            title: "Payment Visibility",
            description: "See exactly when your payment is processed. Get clear explanations for any adjustments or delays.",
            icon: Eye,
            color: "text-[#c9a66b]"
        },
        {
            title: "AI Risk Insights",
            description: "Predict potential yield risks and buyer delay probabilities before they impact your income.",
            icon: BrainCircuit,
            color: "text-red-400"
        },
        {
            title: "Scheme Eligibility Scanner",
            description: "Automatically match your land and crop data with relevant government subsidy schemes.",
            icon: ScanSearch,
            color: "text-[#7c9473]"
        }
    ]

    return (
        <section id="features" className="relative min-h-screen py-32 px-6 bg-[#f8f9f5]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="px-4 py-1 border border-[#7c9473]/30 text-[#7c9473] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit"
                        >
                            CAPABILITIES
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#2d3429] tracking-tight leading-none">
                            Powerful Tools For <br />
                            Digital <span className="text-[#7c9473]">Agriculture</span>.
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-xs text-sm leading-relaxed mb-4">
                        A comprehensive suite of tools built to secure your legacy and maximize your farm's potential.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-neutral-200 border border-neutral-200 rounded-[40px] overflow-hidden shadow-2xl">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-12 group hover:bg-[#7c9473]/5 transition-colors duration-500"
                        >
                            <div className={`w-12 h-12 mb-8 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon size={44} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-[#2d3429] mb-4 group-hover:text-[#7c9473] transition-colors">{feature.title}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
