"use client"

import React from "react"
import { motion } from "framer-motion"

const STATS = [
    { label: "Active Nodes", value: "1,240+" },
    { label: "Transactions/sec", value: "15,000" },
    { label: "Storage Capacity", value: "48 PB" },
]

export function AdditionalSection() {
    return (
        <section id="additional" className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 border-t border-white/5">
            <div className="max-w-6xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-black text-white font-mono mb-2">{stat.value}</div>
                            <div className="text-cyan-400/50 text-xs font-mono uppercase tracking-[0.2em]">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">READY TO CONNECT?</h2>
                    <p className="text-neutral-500 max-w-xl mx-auto mb-8">
                        Join the network and experience the next generation of digital infrastructure.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-colors">
                            JOIN_NETWORK
                        </button>
                        <button className="px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
                            DOCUMENTATION
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
