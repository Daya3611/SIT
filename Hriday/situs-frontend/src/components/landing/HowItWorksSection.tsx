"use client"

import React from "react"
import { motion } from "framer-motion"
import { Map, Zap, Plane, CheckCircle2 } from "lucide-react"

export function HowItWorksSection() {
    const steps = [
        {
            title: "Register Land",
            label: "Step 01",
            description: "Securely upload and anchor your land records to the blockchain.",
            icon: Map,
            color: "bg-[#7c9473]/10 text-[#7c9473]"
        },
        {
            title: "Register Crop",
            label: "Step 02",
            description: "Log your planting data and quantity for seasonal tracking.",
            icon: Zap,
            color: "bg-[#9b7e6b]/10 text-[#9b7e6b]"
        },
        {
            title: "Track Shipment",
            label: "Step 03",
            description: "Monitor your harvest in real-time until it reaches the buyer.",
            icon: Plane,
            color: "bg-[#546a7b]/10 text-[#546a7b]"
        },
        {
            title: "Verify Payment",
            label: "Step 04",
            description: "Receive instant confirmation and clear reasoning for any delays.",
            icon: CheckCircle2,
            color: "bg-[#c9a66b]/10 text-[#c9a66b]"
        }
    ]

    return (
        <section id="how-it-works" className="relative min-h-screen py-32 px-6 bg-[#fdfdfb]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-[#7c9473]/10 text-[#7c9473] rounded-full text-xs font-black uppercase tracking-widest mb-6"
                    >
                        THE_PROCESS
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2d3429]">How DBT-Connect Works</h2>
                    <p className="text-neutral-500 mt-6 max-w-xl mx-auto">
                        A simple, transparent workflow designed for the modern farmer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-10 bg-white border border-neutral-100 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="absolute top-8 right-10 text-[40px] font-black text-neutral-50 tabular-nums">
                                {index + 1}
                            </div>
                            <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-8 relative z-10`}>
                                <step.icon size={28} />
                            </div>
                            <div className="text-[10px] font-black tracking-widest text-[#7c9473] mb-4 uppercase">{step.label}</div>
                            <h3 className="text-xl font-bold text-[#2d3429] mb-4">{step.title}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
