"use client"

import React from "react"
import { motion } from "framer-motion"

export function CTASection() {
    return (
        <section id="contact" className="relative py-32 px-6 bg-[#fdfdfb]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full bg-[#2d3429] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
                >
                    {/* Abstract Background patterns */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/4 w-[100%] aspect-square bg-[#7c9473] rounded-full blur-[120px]" />
                        <div className="absolute -bottom-1/2 -right-1/4 w-[100%] aspect-square bg-[#c9a66b] rounded-full blur-[120px]" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Start Managing Your <br />
                            Farm Today.
                        </h2>
                        <p className="text-[#soft-white]/60 max-w-xl mx-auto text-lg">
                            Join thousands of farmers already using AgriPayChain to
                            secure their income and legacy.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 pt-4">
                            <button className="px-12 py-5 bg-[#7c9473] text-white font-bold rounded-2xl hover:bg-[#6a8062] transition-all hover:scale-105 shadow-xl">
                                Register Now
                            </button>
                            <button className="px-12 py-5 bg-white text-[#2d3429] font-bold rounded-2xl hover:bg-neutral-100 transition-all hover:scale-105 shadow-xl">
                                Worker Portal
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
