"use client"

import React from "react"
import { motion } from "framer-motion"

export function DetailsSection() {
    return (
        <section id="details" className="relative min-h-screen bg-black flex items-center justify-center py-24 px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono leading-tight">
                        DECODING THE <span className="text-cyan-400">INTERFACE</span>
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                        Our platform simplifies complex land records and transaction history through a decentralized ledger
                        architecture. Every transaction is immutable, transparent, and instantly verifiable by all stakeholders.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-cyan-400/80 font-mono text-sm">
                            <span className="w-8 h-px bg-cyan-400/30" />
                            <span>TRANSPARENCY // GUARANTEED</span>
                        </div>
                        <div className="flex items-center gap-4 text-cyan-400/80 font-mono text-sm">
                            <span className="w-8 h-px bg-cyan-400/30" />
                            <span>SECURITY // PROTOCOL_V3</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 relative"
                >
                    {/* Abstract UI element mockup */}
                    <div className="w-full aspect-square border border-white/5 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full flex items-center justify-center p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="w-full h-full border border-cyan-400/20 rounded-full animate-spin-slow" />
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                            <div className="h-48 w-48 bg-cyan-400/10 blur-[60px]" />
                        </div>
                        <div className="z-10 text-center">
                            <span className="text-6xl font-black text-cyan-400 tracking-tighter">99.9%</span>
                            <p className="text-white/40 text-xs font-mono mt-2 tracking-widest">UPTIME_AVAILABILITY</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </section>
    )
}
