"use client"

import React from "react"
import { motion } from "framer-motion"

const CARDS = [
    {
        title: "Explore Features",
        description: "Discover everything our portal has to offer to streamline your workflow.",
    },
    {
        title: "Data Analytics",
        description: "Powerful tools to analyze your data in real time with high accuracy.",
    },
    {
        title: "Secure System",
        description: "Built with modern security measures to ensure your data stays safe.",
    },
]

export function SlidingCards() {
    return (
        <section id="cards" className="relative min-h-screen bg-black py-24 px-6 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-mono">SYSTEM_MODULES</h2>
                    <div className="h-1 w-20 bg-cyan-400 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CARDS.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-cyan-400/5 transition-all duration-500"
                        >
                            <div className="mb-6 w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-mono font-bold border border-cyan-400/20">
                                0{index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 font-mono">
                                {card.title}
                            </h3>
                            <p className="text-neutral-500 leading-relaxed text-sm">
                                {card.description}
                            </p>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
