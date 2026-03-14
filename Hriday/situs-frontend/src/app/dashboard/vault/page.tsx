"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion, AnimatePresence } from "framer-motion"
import {
    Upload,
    FileText,
    CheckCircle2,
    ShieldCheck,
    Clock,
    Shield,
    Plus,
    MoreVertical,
    Search,
    Download,
    Eye,
    Trash2,
    AlertCircle
} from "lucide-react"

const DOCUMENTS = [
    { name: "Aadhar_Card_Rajesh.pdf", type: "Identity", size: "1.2 MB", status: "Verified", date: "20 Jan 2026" },
    { name: "Land_Record_Batch_7.pdf", type: "Land", size: "3.5 MB", status: "Verified", date: "15 Feb 2026" },
    { name: "Income_Certificate_2025.pdf", type: "Income", size: "850 KB", status: "Pending", date: "25 Feb 2026" },
]

export default function DocumentVaultPage() {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStep, setUploadStep] = useState(0) // 0: Idle, 1: Uploading, 2: OCR, 3: Completed

    const handleUpload = () => {
        setUploadStep(1)
        setTimeout(() => {
            setUploadStep(2)
            setTimeout(() => {
                setUploadStep(3)
                setTimeout(() => setUploadStep(0), 3000)
            }, 2500)
        }, 1500)
    }

    return (
        <DashboardLayout pageTitle="Document Vault">
            <div className="space-y-10">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#7c9473] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            className="w-full bg-white border border-neutral-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-[#2d3429] focus:outline-none focus:border-[#7c9473] transition-all"
                        />
                    </div>
                    <button
                        onClick={handleUpload}
                        className="w-full md:w-auto px-8 py-4 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-[#7c9473] transition-all shadow-xl shadow-[#2d3429]/10"
                    >
                        <Plus size={16} /> Upload Document
                    </button>
                </div>

                {/* Upload Status Overlay (Simulated OCR) */}
                <AnimatePresence>
                    {uploadStep > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            className="bg-[#2d3429] p-8 rounded-[32px] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Shield size={120} />
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                {uploadStep === 1 ? (
                                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                                ) : uploadStep === 2 ? (
                                    <ShieldCheck className="text-[#7c9473] animate-pulse" size={32} />
                                ) : (
                                    <CheckCircle2 className="text-[#7c9473]" size={32} />
                                )}
                            </div>

                            <div className="flex-grow space-y-2 text-center md:text-left relative z-10">
                                <h4 className="text-lg font-black uppercase tracking-tighter">
                                    {uploadStep === 1 && "Uploading Document..."}
                                    {uploadStep === 2 && "Running AI OCR Scanner..."}
                                    {uploadStep === 3 && "Document Securely Stored!"}
                                </h4>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                    {uploadStep === 1 && "Establishing secure tunnel to IPFS storage"}
                                    {uploadStep === 2 && "Extracting identity fields and mapping to farmer ID"}
                                    {uploadStep === 3 && "Verified by blockchain node #8821-V"}
                                </p>
                            </div>

                            {uploadStep === 2 && (
                                <div className="hidden md:block w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.5 }}
                                        className="h-full bg-[#7c9473]"
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Document Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DOCUMENTS.map((doc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm hover:shadow-xl hover:border-[#7c9473]/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-[#2d3429] group-hover:bg-[#7c9473] group-hover:text-white transition-colors">
                                    <FileText size={24} />
                                </div>
                                <button className="p-2 text-neutral-300 hover:text-[#2d3429]">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-[#2d3429] truncate">{doc.name}</h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md">{doc.type}</span>
                                    <span className="text-[10px] font-bold text-neutral-300">{doc.size}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-neutral-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Verified' ? 'bg-[#7c9473]' : 'bg-[#c9a66b]'}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${doc.status === 'Verified' ? 'text-[#7c9473]' : 'text-[#c9a66b]'}`}>
                                        {doc.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-2 text-neutral-300 hover:text-[#7c9473] transition-colors"><Eye size={16} /></button>
                                    <button className="p-2 text-neutral-300 hover:text-[#7c9473] transition-colors"><Download size={16} /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty State / Add Card */}
                    <div className="bg-[#f8f9f5] border-2 border-dashed border-neutral-100 rounded-[40px] flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-[#7c9473]/30 transition-all group">
                        <Plus className="text-neutral-200 mb-4 group-hover:text-[#7c9473] transition-colors" size={40} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-[#2d3429]">Add New Document</span>
                    </div>
                </div>

                {/* Security Message */}
                <div className="bg-[#7c9473]/5 border border-[#7c9473]/10 rounded-[32px] p-8 flex items-start gap-6">
                    <ShieldCheck className="text-[#7c9473] mt-1" size={24} />
                    <div className="space-y-2">
                        <h5 className="text-xs font-black text-[#2d3429] uppercase tracking-widest">One-Click Applications Enabled</h5>
                        <p className="text-xs text-[#2d3429]/60 font-medium leading-relaxed">
                            Your documents are encrypted and stored in your private digital locker. When you apply for a scheme or KCC loan, these verified copies are automatically attached, bypassing physical submission.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
