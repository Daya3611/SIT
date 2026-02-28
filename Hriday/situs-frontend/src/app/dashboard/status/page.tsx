"use client"

import React from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import { HelpingHand, Clock, CheckCircle2, ChevronRight, AlertCircle, Calendar, Landmark, Info } from "lucide-react"

const APPLICATIONS = [
    {
        id: "APP-44921",
        name: "Kisan Credit Card (HDFC Agri)",
        status: "Processing",
        date: "Feb 28, 2026",
        progress: 45,
        bank: "HDFC Bank",
        steps: [
            { label: "KYC Verified", completed: true, date: "Feb 28" },
            { label: "Land Asset Valuation", completed: true, date: "Feb 28" },
            { label: "Bank Approval", completed: false, date: "Pending" },
            { label: "Fund Disbursement", completed: false, date: "Pending" }
        ]
    },
    {
        id: "APP-31102",
        name: "Solar Pump Subsidy (SMAM)",
        status: "Approved",
        date: "Feb 15, 2026",
        progress: 100,
        bank: "Govt of India",
        steps: [
            { label: "Application Received", completed: true, date: "Feb 15" },
            { label: "Field Inspection", completed: true, date: "Feb 20" },
            { label: "Eligibility Confirmed", completed: true, date: "Feb 22" },
            { label: "Grant Released", completed: true, date: "Feb 24" }
        ]
    }
]

export default function ApplicationStatusPage() {
    return (
        <DashboardLayout pageTitle="Application Tracker">
            <div className="space-y-10">
                {/* Tracker Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[40px] p-8 border border-neutral-100 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#7c9473]/10 text-[#7c9473] flex items-center justify-center shrink-0">
                            <Clock size={28} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">In Progress</div>
                            <div className="text-2xl font-black text-[#2d3429]">01</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[40px] p-8 border border-neutral-100 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#c9a66b]/10 text-[#c9a66b] flex items-center justify-center shrink-0">
                            <CheckCircle2 size={28} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Approved</div>
                            <div className="text-2xl font-black text-[#2d3429]">04</div>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
                        <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter uppercase">My Applications</h3>
                        <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Showing last year</div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {APPLICATIONS.map((app, i) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[48px] p-10 border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-[#7c9473]/30 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row gap-12">
                                    {/* Left Info */}
                                    <div className="lg:w-1/3 space-y-8">
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-lg text-[8px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-100">
                                                {app.id}
                                            </div>
                                            <h4 className="text-2xl font-black text-[#2d3429] tracking-tighter group-hover:text-[#7c9473] transition-colors">{app.name}</h4>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-neutral-300" />
                                                    <span className="text-[10px] font-bold text-neutral-400">{app.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Landmark size={14} className="text-neutral-300" />
                                                    <span className="text-[10px] font-bold text-neutral-400">{app.bank}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Current Progress</span>
                                                <span className="text-[10px] font-black text-[#7c9473]">{app.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${app.progress}%` }}
                                                    className="h-full bg-[#7c9473]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Status Steps */}
                                    <div className="flex-grow">
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                            {app.steps.map((step, idx) => (
                                                <div key={idx} className="relative space-y-4 group/step">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${step.completed ? 'bg-[#7c9473] text-white' : 'bg-neutral-50 text-neutral-200 border border-neutral-100'
                                                        }`}>
                                                        {step.completed ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className={`text-[10px] font-black uppercase tracking-tighter ${step.completed ? 'text-[#2d3429]' : 'text-neutral-300'}`}>
                                                            {step.label}
                                                        </div>
                                                        <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                                                            {step.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#7c9473]" />
                                                <span className="text-[10px] font-black text-[#2d3429] uppercase tracking-tighter">Current Status</span>
                                                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${app.status === 'Approved' ? 'bg-[#7c9473]/10 text-[#7c9473]' : 'bg-[#c9a66b]/10 text-[#c9a66b]'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2d3429] hover:text-[#7c9473] transition-colors">
                                                View Details <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-[#2d3429] rounded-[48px] p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <HelpingHand size={180} />
                    </div>
                    <div className="max-w-xl relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10">
                            AgriNavigator Support
                        </div>
                        <h4 className="text-3xl font-black tracking-tighter uppercase leading-tight">Need Assistance?</h4>
                        <p className="text-white/40 text-sm font-medium leading-relaxed">
                            If your application is delayed or you need help with documents, our dedicated loan officers are available for video consultation.
                        </p>
                        <button className="px-10 py-4 bg-[#7c9473] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#6a8062] transition-colors">
                            Request Callback
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
