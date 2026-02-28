"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, FileText, Wallet, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    const flowSteps = [
        { icon: ShieldCheck, label: "KYC Portal", color: "text-[#7c9473]", desc: "Instant Identity Verification" },
        { icon: FileText, label: "Scheme Match", color: "text-[#9b7e6b]", desc: "Govt. Subsidy Finder" },
        { icon: Wallet, label: "Agri-Loans", color: "text-[#546a7b]", desc: "Low-Interest Credit" },
        { icon: CreditCard, label: "KCC Access", color: "text-[#c9a66b]", desc: "Kisan Credit Services" },
    ]

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 bg-[#fdfdfb] overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#7c9473]/5 rounded-full blur-[120px]" />

            <div className="max-w-4xl w-full text-center space-y-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-[#7c9473]/10 rounded-full border border-[#7c9473]/20"
                >
                    <span className="w-2 h-2 bg-[#7c9473] rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7c9473]">wAG006 // Financial Empowerment</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black text-[#2d3429] tracking-tighter leading-[0.9] text-balance"
                >
                    Navigate Every <span className="text-[#7c9473]">Scheme.</span><br />
                    Secure Every <span className="text-[#c9a66b]">Subsidy.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    The unified gateway for Indian farmers to discover, apply, and track government agricultural loans, subsidies, and Kisan Credit Card services in one secure place.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
                >
                    <Link href="/dashboard" className="px-10 py-5 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#7c9473] transition-all flex items-center gap-3 shadow-2xl shadow-[#2d3429]/20 group">
                        Check Eligibility <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/schemes" className="px-10 py-5 bg-white text-[#2d3429] border-2 border-neutral-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-[#7c9473] transition-all">
                        Browse Hub
                    </Link>
                </motion.div>

                {/* Animated Visual Flow */}
                <div className="pt-24 relative max-w-4xl mx-auto w-full">
                    <div className="flex justify-between items-center relative z-10">
                        {flowSteps.map((step, index) => (
                            <React.Fragment key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 + index * 0.3 }}
                                    className="flex flex-col items-center space-y-4 group"
                                >
                                    <div className={`w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center ${step.color} transition-transform group-hover:scale-110 duration-500 border border-neutral-50`}>
                                        <step.icon size={36} />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2d3429]">{step.label}</span>
                                        <span className="text-[8px] font-bold text-neutral-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{step.desc}</span>
                                    </div>
                                </motion.div>

                                {index < flowSteps.length - 1 && (
                                    <div className="flex-1 px-4 relative flex items-center h-20">
                                        <div className="h-[1px] w-full bg-neutral-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "0%" }}
                                                transition={{
                                                    delay: 1.3 + index * 0.3,
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    repeatDelay: 2
                                                }}
                                                className="h-full w-full bg-gradient-to-r from-transparent via-[#7c9473]/40 to-transparent"
                                            />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
