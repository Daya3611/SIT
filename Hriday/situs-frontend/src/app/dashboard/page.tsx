"use client"

import React from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion } from "framer-motion"
import { LandPlot, Sprout, Truck, CreditCard, ArrowUpRight, TrendingUp } from "lucide-react"
import { api } from "@/lib/api"

export default function DashboardPage() {
    const [user, setUser] = React.useState<any>(null)
    const [schemes, setSchemes] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        Promise.all([
            api.getProfile("FARMER-8821"),
            api.getSchemes()
        ]).then(([profileRes, schemesRes]) => {
            if (profileRes.success) setUser(profileRes.data)
            if (schemesRes.success) setSchemes(schemesRes.data.slice(0, 2))
            setLoading(false)
        })
    }, [])

    const stats = [
        { label: "Total Lands", value: user?.landSize ? `${user.landSize} Ha` : "3", icon: LandPlot, color: "text-[#7c9473]", bg: "bg-[#7c9473]/10" },
        { label: "Active Crops", value: user?.crops?.length || "8", icon: Sprout, color: "text-[#9b7e6b]", bg: "bg-[#9b7e6b]/10" },
        { label: "Shipments", value: "2", icon: Truck, color: "text-[#546a7b]", bg: "bg-[#546a7b]/10" },
        { label: "Pending Payments", value: "₹45,200", icon: CreditCard, color: "text-[#c9a66b]", bg: "bg-[#c9a66b]/10" },
    ]

    return (
        <DashboardLayout pageTitle="Overview">
            <div className="space-y-8">
                {/* Welcome Block */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-[#2d3429] tracking-tighter uppercase leading-none">
                            Welcome back, {user?.name || "Farmer"}
                        </h2>
                        <p className="text-neutral-400 font-medium text-sm mt-2">Here is what is happening with your farm today.</p>
                    </div>
                    <div className="px-4 py-2 bg-white border border-neutral-100 rounded-xl flex items-center gap-3 shadow-sm font-bold text-[#7c9473] text-xs">
                        <div className="w-2 h-2 rounded-full bg-[#7c9473] animate-pulse" />
                        SYSTEM_STABLE // SYNCED
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest leading-none">Live</div>
                            </div>
                            <div className="text-3xl font-black text-[#2d3429] mb-1">{stat.value}</div>
                            <div className="text-xs font-bold text-neutral-400 uppercase tracking-tight">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Scheme Suggestions Summary */}
                    <div className="lg:col-span-2 bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-black text-[#2d3429] uppercase tracking-tighter">Recommended Schemes</h3>
                            <button className="text-[10px] font-black text-[#7c9473] uppercase tracking-widest flex items-center gap-2">
                                View All <ArrowUpRight size={14} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="h-20 bg-neutral-50 rounded-2xl animate-pulse" />
                            ) : (
                                schemes.map((scheme, i) => (
                                    <div key={i} className="p-5 border border-neutral-50 rounded-2xl flex justify-between items-center group hover:bg-[#7c9473]/5 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-[#7c9473]">
                                                <TrendingUp size={20} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[#2d3429]">{scheme.title}</div>
                                                <div className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-1">{scheme.category}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-black text-[#7c9473] uppercase px-3 py-1 bg-[#7c9473]/10 rounded-full whitespace-nowrap">
                                            {scheme.provider}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Actions / Recent status */}
                    <div className="bg-[#2d3429] rounded-[32px] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-black text-white/50 uppercase tracking-tighter mb-8">System Verification</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#7c9473] mt-2" />
                                    <div>
                                        <div className="text-sm font-bold">Land #2882 Verified</div>
                                        <div className="text-[9px] font-bold text-white/30 uppercase mt-1">Hashed: 0x82f...a1</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#c9a66b] mt-2" />
                                    <div>
                                        <div className="text-sm font-bold">Payment #P29 Pending</div>
                                        <div className="text-[9px] font-bold text-white/30 uppercase mt-1">Expected: 12th March</div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-12 py-4 bg-white text-[#2d3429] rounded-xl font-bold text-sm hover:bg-[#7c9473] hover:text-white transition-all shadow-xl">
                                Add New Land Record
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
