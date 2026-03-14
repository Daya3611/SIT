"use client"

import React from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import { CreditCard, Wallet, ArrowUpRight, ArrowDownRight, BrainCircuit, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const ORDERS = [
    { id: "#ORD-991", buyer: "Indo-Grain Corp", amount: "₹82,400", status: "Paid", date: "24 Feb 2026", color: "text-[#7c9473]", bg: "bg-[#7c9473]/10" },
    { id: "#ORD-992", buyer: "Premium Flour Mills", amount: "₹45,200", status: "Pending", date: "Expected Mar 05", color: "text-[#c9a66b]", bg: "bg-[#c9a66b]/10" },
    { id: "#ORD-995", buyer: "Nandi Feeds Ltd", amount: "₹128,000", status: "Delayed", date: "Review Pending", color: "text-red-400", bg: "bg-red-50/50", reason: "Logistics bottleneck at Hub-04 caused quality re-verification delay." },
]

export default function PaymentsPage() {
    return (
        <DashboardLayout pageTitle="Payments">
            <div className="space-y-10">
                {/* Financial Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#7c9473]/10 text-[#7c9473] flex items-center justify-center">
                                <Wallet size={24} />
                            </div>
                            <span className="text-[10px] font-black text-[#7c9473] bg-[#7c9473]/5 px-3 py-1 rounded-full uppercase tracking-widest">+12% vs LY</span>
                        </div>
                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">Total Earnings</div>
                        <div className="text-3xl font-black text-[#2d3429]">₹8,44,200</div>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#c9a66b]/10 text-[#c9a66b] flex items-center justify-center">
                                <CreditCard size={24} />
                            </div>
                        </div>
                        <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">In Escrow / Pending</div>
                        <div className="text-3xl font-black text-[#2d3429]">₹1,73,200</div>
                    </div>

                    <div className="bg-[#2d3429] rounded-[32px] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <BrainCircuit size={80} />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="flex items-center gap-3 text-[#c9a66b] mb-4">
                                <AlertCircle size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">AI Financial Forecast</span>
                            </div>
                            <p className="text-sm font-bold leading-tight">95% of pending payments are expected within 7 days based on current logistics speed.</p>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
                    <div className="p-10 border-b border-neutral-50 flex justify-between items-center">
                        <h3 className="font-black text-[#2d3429] uppercase tracking-tighter">Transaction History</h3>
                        <div className="flex gap-4">
                            <button className="px-5 py-2.5 bg-[#f8f9f5] rounded-xl text-[10px] font-black text-[#2d3429] uppercase tracking-widest border border-neutral-100">Monthly_Export</button>
                            <button className="px-5 py-2.5 bg-[#f8f9f5] rounded-xl text-[10px] font-black text-[#2d3429] uppercase tracking-widest border border-neutral-100">Tax_Manifest</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#f8f9f5] text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                    <th className="px-10 py-6">Order ID</th>
                                    <th className="px-10 py-6">Buyer</th>
                                    <th className="px-10 py-6">Amount</th>
                                    <th className="px-10 py-6">Status</th>
                                    <th className="px-10 py-6">Expected / Paid Date</th>
                                    <th className="px-10 py-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50">
                                {ORDERS.map((order, i) => (
                                    <React.Fragment key={i}>
                                        <tr className="group hover:bg-[#f8f9f5]/50 transition-colors">
                                            <td className="px-10 py-8 font-black text-[#2d3429] text-sm tabular-nums">{order.id}</td>
                                            <td className="px-10 py-8">
                                                <div className="text-sm font-bold text-[#2d3429]">{order.buyer}</div>
                                                <div className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mt-1">Grains Category</div>
                                            </td>
                                            <td className="px-10 py-8 font-black text-[#2d3429] text-sm">{order.amount}</td>
                                            <td className="px-10 py-8">
                                                <span className={cn(
                                                    "inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                    order.bg, order.color
                                                )}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-xs font-bold text-neutral-400">{order.date}</td>
                                            <td className="px-10 py-8">
                                                <button className="p-3 bg-neutral-50 rounded-xl text-neutral-400 group-hover:bg-[#7c9473] group-hover:text-white transition-all">
                                                    <ArrowUpRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                        {order.status === "Delayed" && (
                                            <tr className="bg-red-50/20">
                                                <td colSpan={6} className="px-10 py-4">
                                                    <div className="flex items-center gap-4 text-red-400">
                                                        <BrainCircuit size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">AI_ANALYSIS:</span>
                                                        <span className="text-xs font-medium text-red-500/70 italic">{order.reason}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
