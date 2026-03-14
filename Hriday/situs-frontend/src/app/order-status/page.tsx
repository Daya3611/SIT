"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, ShieldCheck, Download } from "lucide-react";

function OrderStatusContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const paymentId = searchParams?.get("payment_id");
    const orderId = searchParams?.get("order_id");
    const amount = searchParams?.get("amount");

    return (
        <main className="relative min-h-screen bg-[#fdfdfb] pt-20">
            <NavBar />

            <div className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh] flex items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-white rounded-[48px] p-10 md:p-16 border border-neutral-100 shadow-2xl flex flex-col items-center text-center"
                >
                    <div className="w-24 h-24 bg-[#7c9473]/10 rounded-full flex items-center justify-center mb-8">
                        <CheckCircle2 size={48} className="text-[#7c9473]" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-[#2d3429] tracking-tighter mb-4">
                        Payment Successful!
                    </h1>

                    <p className="text-neutral-400 font-medium text-lg leading-relaxed max-w-lg mb-10">
                        Your order has been placed and secured on the blockchain ledger. We're getting your items ready for dispatch.
                    </p>

                    <div className="w-full bg-[#f8f9f5] rounded-3xl p-6 border border-neutral-100 text-left space-y-4 mb-10">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-100 rounded-full w-max mb-6">
                            <ShieldCheck size={14} className="text-[#c9a66b]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2d3429]">
                                Verified Transaction
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Payment ID</span>
                            <span className="text-sm font-black text-[#2d3429] break-all text-right">{paymentId || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Order ID</span>
                            <span className="text-sm font-black text-[#2d3429] break-all text-right">{orderId || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Total Amount</span>
                            <span className="text-2xl font-black text-[#7c9473]">₹{amount || "0"}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button
                            onClick={() => window.print()}
                            className="flex-1 py-5 bg-white border-2 border-[#2d3429] text-[#2d3429] rounded-2xl font-black uppercase tracking-[0.1em] text-[12px] flex items-center justify-center gap-3 hover:bg-neutral-50 transition-all"
                        >
                            <Download size={16} /> Download Receipt
                        </button>
                        <button
                            onClick={() => router.push('/marketplace')}
                            className="flex-1 py-5 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-[0.1em] text-[12px] flex items-center justify-center gap-3 hover:bg-[#7c9473] transition-all shadow-xl"
                        >
                            Return to Market <ArrowRight size={16} />
                        </button>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}

export default function OrderStatusPage() {
    return (
        <ProtectedRoute>
            <Suspense fallback={<div className="min-h-screen bg-[#fdfdfb] flex items-center justify-center">Loading...</div>}>
                <OrderStatusContent />
            </Suspense>
        </ProtectedRoute>
    );
}
