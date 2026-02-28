"use client"

import React from "react"
import { motion } from "framer-motion"
import { Database, Brain, Cpu } from "lucide-react"

export function TechTrustSection() {
    const techs = [
        {
            title: "Blockchain",
            tag: "Tamper-Proof Ledger",
            description: "Every land record and transaction is anchored to a decentralized ledger, ensuring permanent trust and immutability.",
            icon: Database,
            details: ["Immutable History", "Shared Source of Truth", "Verifiable Identity"]
        },
        {
            title: "AI Analysis",
            tag: "Risk Prediction",
            description: "Our algorithms analyze satellite imagery and historical trends to predict payment delays and crop risks.",
            icon: Brain,
            details: ["Yield Estimations", "Buyer Risk Scoring", "Payment Forecasts"]
        },
        {
            title: "IoT Systems",
            tag: "Soil & Logistics",
            description: "Remote sensors monitoring soil health and GPS trackers on shipments provide real-time ground truth data.",
            icon: Cpu,
            details: ["Real-time Tracking", "Soil Health Monitoring", "Dynamic ETA Updates"]
        }
    ]

    return (
        <section id="technology" className="relative min-h-screen py-32 px-6 bg-[#fdfdfb]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-[#546a7b]/10 text-[#546a7b] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        OUR_INFRASTRUCTURE
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2d3429] mb-6">Built on Foundation of Trust</h2>
                    <p className="text-neutral-500 leading-relaxed italic">
                        "Technology should be invisible to the farmer, but the trust it generates should be everywhere."
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {techs.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-2"
                        >
                            <div className="bg-white border border-neutral-100 rounded-[48px] p-10 h-full flex flex-col shadow-sm group-hover:shadow-2xl transition-all duration-500 group-hover:border-[#7c9473]/20">
                                <div className="w-16 h-16 rounded-[24px] bg-neutral-100 text-[#546a7b] flex items-center justify-center mb-8 group-hover:bg-[#7c9473]/10 group-hover:text-[#7c9473] transition-colors">
                                    <tech.icon size={32} />
                                </div>
                                <div className="text-[10px] font-black text-[#c9a66b] uppercase tracking-widest mb-2">{tech.tag}</div>
                                <h3 className="text-2xl font-bold text-[#2d3429] mb-6">{tech.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed mb-8 flex-grow">
                                    {tech.description}
                                </p>
                                <div className="pt-8 border-t border-neutral-50 space-y-3">
                                    {tech.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-[#2d3429]/60 uppercase tracking-tighter">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#7c9473]" />
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
