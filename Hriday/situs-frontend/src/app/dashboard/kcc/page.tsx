"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import { CreditCard, ShieldCheck, Landmark, ArrowRight, CheckCircle2, AlertCircle, FileText, Info } from "lucide-react"

export default function KCCPortalPage() {
    const [step, setStep] = useState(1)

    return (
        <DashboardLayout pageTitle="Kisan Credit Card (KCC) Portal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Action Area */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Status Overview */}
                    <div className="bg-white rounded-[48px] p-10 border border-neutral-100 shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-widest text-[#7c9473]">Active Card Status</div>
                                <h3 className="text-3xl font-black text-[#2d3429] tracking-tighter">No Active KCC Detected</h3>
                                <p className="text-neutral-400 text-xs font-bold max-w-sm">
                                    Our system detected you don't have a linked Kisan Credit Card. Apply today to access low-interest credit for your seasonal farming needs.
                                </p>
                            </div>
                            <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 flex flex-col items-center">
                                <CreditCard size={48} className="text-neutral-200 mb-4" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-300">Not Linked</span>
                            </div>
                        </div>
                    </div>

                    {/* Application Flow */}
                    <div className="bg-white rounded-[48px] p-12 border border-neutral-100 shadow-sm space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#7c9473] text-white flex items-center justify-center font-black">1</div>
                            <div className="h-[2px] flex-grow bg-neutral-100 rounded-full relative overflow-hidden">
                                <div className={`absolute inset-y-0 left-0 bg-[#7c9473] transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`} />
                            </div>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors ${step >= 2 ? 'bg-[#7c9473] text-white' : 'bg-neutral-50 text-neutral-300'}`}>2</div>
                            <div className="h-[2px] flex-grow bg-neutral-100 rounded-full relative overflow-hidden">
                                <div className={`absolute inset-y-0 left-0 bg-[#7c9473] transition-all duration-500 ${step > 2 ? 'w-full' : 'w-0'}`} />
                            </div>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors ${step >= 3 ? 'bg-[#7c9473] text-white' : 'bg-neutral-50 text-neutral-300'}`}>3</div>
                        </div>

                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                <div>
                                    <h4 className="text-2xl font-black text-[#2d3429] tracking-tighter mb-4 uppercase">Eligibility Check</h4>
                                    <p className="text-neutral-500 text-sm font-medium">Verify your one-click eligibility status based on your registered land records.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-[#f8f9f5] rounded-3xl border border-[#7c9473]/10 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Land Holding</span>
                                            <CheckCircle2 size={16} className="text-[#7c9473]" />
                                        </div>
                                        <div className="text-lg font-black text-[#2d3429]">1.5 Hectares (SMF)</div>
                                    </div>
                                    <div className="p-6 bg-[#f8f9f5] rounded-3xl border border-[#7c9473]/10 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Crop Cycle</span>
                                            <CheckCircle2 size={16} className="text-[#7c9473]" />
                                        </div>
                                        <div className="text-lg font-black text-[#2d3429]">Kharif (Wheat/Pulse)</div>
                                    </div>
                                </div>

                                <div className="p-8 bg-[#e9f0e8] rounded-[32px] border border-[#7c9473]/20 flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#7c9473] shadow-sm">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-black text-[#2d3429] tracking-tighter">Pre-Approved Limit</h5>
                                        <p className="text-[#7c9473] text-2xl font-black uppercase tracking-tighter leading-tight mt-1">₹1,25,000</p>
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="ml-auto px-8 py-4 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7c9473] transition-all flex items-center gap-2"
                                    >
                                        Proceed <ArrowRight size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                <div>
                                    <h4 className="text-2xl font-black text-[#2d3429] tracking-tighter mb-4 uppercase">Select Preferred Bank</h4>
                                    <p className="text-neutral-500 text-sm font-medium">Choose from our integrated banking partners for faster digital processing.</p>
                                </div>

                                <div className="space-y-4">
                                    {["State Bank of India", "HDFC Bank (Agri)", "Nabard Regional Rural"].map((bank, i) => (
                                        <div key={bank} className="p-6 bg-white rounded-3xl border border-neutral-100 hover:border-[#7c9473] transition-all flex items-center justify-between group cursor-pointer shadow-sm">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 group-hover:text-[#7c9473] group-hover:bg-[#7c9473]/10 transition-colors">
                                                    <Landmark size={24} />
                                                </div>
                                                <div>
                                                    <div className="text-lg font-black text-[#2d3429]">{bank}</div>
                                                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Instant Digital Onboarding</div>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-2 border-neutral-100 group-hover:border-[#7c9473] group-hover:bg-[#7c9473] transition-all" />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setStep(1)} className="px-8 py-4 border border-neutral-100 rounded-2xl font-black uppercase tracking-widest text-[10px] text-neutral-400">Back</button>
                                    <button onClick={() => setStep(3)} className="px-10 py-4 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7c9473] transition-all">Submit to Bank</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-8">
                                <div className="w-24 h-24 bg-[#7c9473]/10 text-[#7c9473] rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={48} />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-4xl font-black text-[#2d3429] tracking-tighter uppercase">Application Sent!</h4>
                                    <p className="text-neutral-500 text-sm font-medium max-w-sm mx-auto">
                                        Your KCC application has been forwarded to the bank. You can track the approval status in your dashboard.
                                    </p>
                                </div>
                                <div className="pt-8">
                                    <button onClick={() => setStep(1)} className="px-12 py-5 bg-[#2d3429] text-white rounded-3xl font-black uppercase tracking-widest text-[11px] hover:bg-[#7c9473] shadow-2xl">Return to Portal</button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-10">
                    <div className="bg-[#2d3429] rounded-[40px] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <h5 className="text-xl font-black tracking-tighter uppercase">KCC Benefits</h5>
                            <ul className="space-y-4">
                                {[
                                    "Low interest rates (4% p.a.)",
                                    "Collateral free loan up to ₹1.6 lakh",
                                    "Flexible repayment schedule",
                                    "Linked with Crop Insurance"
                                ].map((benefit, i) => (
                                    <li key={i} className="flex gap-4 text-xs font-medium text-white/60">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#7c9473] shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-[40px] p-8 border border-neutral-100 shadow-sm space-y-8">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Required Documents</h5>
                        <div className="space-y-4">
                            {[
                                { name: "Aadhar Card", status: "Verified", icon: ShieldCheck },
                                { name: "Land Record (7/12)", status: "Uploaded", icon: FileText },
                                { name: "Bank Passbook", status: "Missing", icon: AlertCircle },
                            ].map((doc, i) => (
                                <div key={doc.name} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                                    <div className="flex items-center gap-3">
                                        <doc.icon size={16} className={doc.status === 'Missing' ? 'text-red-400' : 'text-[#7c9473]'} />
                                        <span className="text-xs font-bold text-[#2d3429]">{doc.name}</span>
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${doc.status === 'Missing' ? 'text-red-400' : 'text-neutral-400'}`}>{doc.status}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-[#f8f9f5] text-[#2d3429] rounded-2xl text-[10px] font-black uppercase tracking-widest border border-neutral-100 hover:bg-neutral-100 transition-colors">
                            Manage Document Vault
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
