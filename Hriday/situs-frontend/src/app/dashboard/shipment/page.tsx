"use client"

import React from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import { Truck, MapPin, Navigation, Clock, ShieldCheck, Phone } from "lucide-react"

const SHIPMENT_STEPS = [
    { name: "Picked Up", time: "Feb 26, 09:00 AM", status: "completed" },
    { name: "In Transit", time: "Feb 27, 02:30 PM", status: "completed" },
    { name: "At Hub", time: "Expected Mar 01", status: "current" },
    { name: "Delivered", time: "Expected Mar 03", status: "upcoming" },
]

export default function ShipmentTrackingPage() {
    return (
        <DashboardLayout pageTitle="Shipment Tracking">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left: Shipment Info & Details */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white rounded-[40px] p-10 border border-neutral-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-[#546a7b]/10 text-[#546a7b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                SHP_ID: #TK-2291
                            </div>
                            <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Live
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter uppercase mb-2">Trans-Agri Logistics</h3>
                        <div className="flex items-center gap-3 text-neutral-400 font-bold text-xs uppercase tracking-tight mb-10">
                            <Navigation size={14} className="text-[#546a7b]" /> Driver: Suraj Singh
                        </div>

                        <div className="space-y-6 pt-6 border-t border-neutral-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Clock size={16} className="text-neutral-300" />
                                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Est. Arrival</span>
                                </div>
                                <span className="text-sm font-black text-[#2d3429]">03 March 2026</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Truck size={16} className="text-neutral-300" />
                                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Vehicle</span>
                                </div>
                                <span className="text-sm font-black text-[#2d3429]">MH-12-AQ-9921</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <ShieldCheck size={16} className="text-neutral-300" />
                                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Insurance</span>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[8px] font-black rounded-lg">ACTIVE</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-[#f8f9f5] border border-neutral-100 text-[#2d3429] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-100 transition-all">
                            <Phone size={14} /> Contact Driver
                        </button>
                    </div>

                    {/* Verification Anchor Info */}
                    <div className="bg-[#2d3429] rounded-[32px] p-8 text-white">
                        <div className="text-[9px] font-black text-[#546a7b] uppercase tracking-[0.2em] mb-4">Blockchain Tracking Anchor</div>
                        <p className="text-white/40 text-xs leading-relaxed mb-6">
                            Each hub arrival is timestamped and anchored to the ledger to prevent route manipulation.
                        </p>
                        <div className="text-[10px] font-mono font-bold py-2 px-3 bg-white/5 rounded-lg text-white/60">
                            ID: 0x99a2...bb12 // HUB_29_CONSENSUS
                        </div>
                    </div>
                </div>

                {/* Right: Map & Timeline */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Map Placeholder */}
                    <div className="bg-neutral-200 rounded-[48px] h-[350px] relative overflow-hidden flex items-center justify-center shadow-inner group">
                        {/* Abstract "Map" UI */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7c9473]/10 to-[#546a7b]/10" />

                        {/* Simulated Pins */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative z-10 flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-[#2d3429] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                                <MapPin size={24} className="text-[#7c9473]" />
                            </div>
                            <div className="mt-4 px-4 py-2 bg-white rounded-xl shadow-xl border border-neutral-100">
                                <span className="text-[10px] font-black text-[#2d3429] uppercase tracking-tighter leading-none">Current: Guntur Hub</span>
                            </div>
                        </motion.div>

                        <div className="absolute bottom-6 right-8 px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                            <span className="text-[10px] font-black text-[#546a7b] uppercase tracking-widest">Live GPS Coordinates // 16.306, 80.436</span>
                        </div>
                    </div>

                    {/* Timeline Wrapper */}
                    <div className="bg-white rounded-[40px] p-10 border border-neutral-100 shadow-sm relative">
                        <h4 className="text-sm font-black text-[#2d3429] uppercase tracking-tighter mb-10">Transit History</h4>

                        <div className="relative space-y-10 pl-6">
                            {/* Vertical line connector */}
                            <div className="absolute left-10 top-0 w-0.5 h-full bg-neutral-100" />

                            {SHIPMENT_STEPS.map((step, index) => (
                                <div key={index} className="flex items-start gap-10 relative">
                                    <div className={`w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center relative z-10 shadow-sm ${step.status === 'completed' ? 'border-[#7c9473]' : step.status === 'current' ? 'border-[#546a7b]' : 'border-neutral-100'
                                        }`}>
                                        {step.status === 'completed' ? (
                                            <div className="w-4 h-4 rounded-full bg-[#7c9473]" />
                                        ) : step.status === 'current' ? (
                                            <div className="w-4 h-4 rounded-full bg-[#546a7b] animate-pulse" />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-neutral-100" />
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h5 className={`text-sm font-black uppercase tracking-tighter ${step.status === 'upcoming' ? 'text-neutral-300' : 'text-[#2d3429]'
                                                }`}>{step.name}</h5>
                                            <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{step.time}</span>
                                        </div>
                                        <div className={`h-1 w-20 mt-2 rounded-full ${step.status === 'completed' ? 'bg-[#7c9473]/30' : step.status === 'current' ? 'bg-[#546a7b]/30' : 'bg-transparent'
                                            }`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
