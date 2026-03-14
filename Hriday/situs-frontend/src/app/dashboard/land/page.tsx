"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, CheckCircle2, ShieldCheck, Clock, Hash } from "lucide-react"

export default function LandRecordsPage() {
    const [isUploading, setIsUploading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const handleUpload = () => {
        setIsUploading(true)
        setTimeout(() => {
            setIsUploading(false)
            setIsVerifying(true)
            setTimeout(() => {
                setIsVerifying(false)
                setShowResult(true)
            }, 2000)
        }, 1500)
    }

    return (
        <DashboardLayout pageTitle="Land Records">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Upload Form */}
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[40px] border border-neutral-100 shadow-sm relative overflow-hidden">
                        <h3 className="text-xl font-black text-[#2d3429] mb-8 uppercase tracking-tighter">Add New Land Parcel</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3 block">Survey Number</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 144/2A"
                                    className="w-full px-6 py-4 bg-[#f8f9f5] border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#7c9473] font-bold text-[#2d3429] transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3 block">Land Document (PDF/JPG)</label>
                                <div className="w-full border-2 border-dashed border-neutral-100 rounded-[32px] p-12 text-center group hover:border-[#7c9473]/30 transition-all cursor-pointer bg-[#f8f9f5]/50">
                                    <Upload className="mx-auto text-neutral-300 mb-4 group-hover:text-[#7c9473] transition-colors" size={40} />
                                    <p className="text-sm font-bold text-neutral-400">Click to upload or drag & drop</p>
                                    <p className="text-[10px] uppercase font-black text-neutral-300 mt-2 tracking-widest">Max file size 10MB</p>
                                </div>
                            </div>

                            <button
                                onClick={handleUpload}
                                disabled={isUploading || isVerifying || showResult}
                                className="w-full py-5 bg-[#2d3429] text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-[#7c9473] transition-all disabled:opacity-50 shadow-xl shadow-[#2d3429]/10"
                            >
                                {isUploading ? "Uploading..." : isVerifying ? "Verifying on Chain..." : "Anchor to Blockchain"}
                            </button>
                        </div>
                    </div>

                    {/* Existing Records Summary */}
                    <div className="bg-[#7c9473]/5 border border-[#7c9473]/10 rounded-[32px] p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="text-[#7c9473]" size={20} />
                            <span className="text-xs font-black text-[#7c9473] uppercase tracking-widest">Global Trust Index: 100% Secure</span>
                        </div>
                        <p className="text-sm text-[#2d3429]/60 font-medium leading-relaxed">
                            All landed properties uploaded to DBT-Connect are anchored to an immutable ledger.
                            This ensures your land rights are protected and verifiable anywhere in the world.
                        </p>
                    </div>
                </div>

                {/* Right: Verification Status & Simulation Results */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {isUploading || isVerifying ? (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="bg-white rounded-[40px] p-12 h-full flex flex-col items-center justify-center text-center border border-neutral-100 shadow-sm"
                            >
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 rounded-full border-4 border-neutral-50 border-t-[#7c9473] animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Hash className="text-[#7c9473]/20" size={32} />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#2d3429] mb-2 uppercase">{isUploading ? "Uploading Data" : "Mining Transaction"}</h4>
                                <p className="text-neutral-400 text-sm max-w-[200px] mx-auto">
                                    {isUploading ? "Transmitting document to secure vault..." : "Securing anchor point on the mainnet..."}
                                </p>
                            </motion.div>
                        ) : showResult ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-white rounded-[40px] p-10 border border-neutral-100 shadow-xl overflow-hidden relative">
                                    {/* Success Banner */}
                                    <div className="bg-[#7c9473] text-white flex items-center justify-center gap-3 py-4 -mt-10 -mx-10 mb-8 px-10">
                                        <CheckCircle2 size={18} strokeWidth={3} />
                                        <span className="text-xs font-black tracking-widest uppercase">Transaction Confirmed</span>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-[#7c9473]/10 text-[#7c9473] flex items-center justify-center">
                                                <FileText size={32} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-neutral-300 uppercase tracking-widest mb-1">Verify Status</div>
                                                <div className="text-lg font-black text-[#2d3429] uppercase">Land_ID #AP-2910</div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-[#f8f9f5] rounded-2xl space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                                                    <Hash size={14} /> Blockchain Hash
                                                </div>
                                                <div className="text-xs font-mono font-bold text-[#7c9473]">0x82f2...91a2</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                                                    <Clock size={14} /> Anchor Time
                                                </div>
                                                <div className="text-xs font-mono font-bold text-[#2d3429]">28 Feb 2026 // 04:52:12</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                                                    <ShieldCheck size={14} /> Node Consensus
                                                </div>
                                                <div className="text-xs font-mono font-bold text-green-500">100% SYNCED</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowResult(false)}
                                            className="w-full text-neutral-300 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[#7c9473] transition-colors"
                                        >
                                            Dismiss Record
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-[#f8f9f5] h-full rounded-[40px] border-2 border-dashed border-neutral-100 flex flex-col items-center justify-center p-12 text-center opacity-40">
                                <FileText className="text-neutral-200 mb-6" size={80} strokeWidth={1} />
                                <h4 className="text-neutral-400 font-bold uppercase tracking-widest">No Active Transaction</h4>
                                <p className="text-neutral-300 text-xs mt-2">Submit a survey number to begin anchor simulation</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    )
}
