"use client"

import React from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion, Variants } from "framer-motion"
import { Sprout, Truck, CreditCard, ArrowUpRight, TrendingUp, Warehouse } from "lucide-react"
import { api } from "@/lib/api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

const marketPricesData = [
    { crop: 'Wheat (LOK-1)', currentPrice: 2315, previousPrice: 2125 },
    { crop: 'Rice (Basmati)', currentPrice: 3150, previousPrice: 2950 },
    { crop: 'Maize (Hybrid)', currentPrice: 2140, previousPrice: 1962 },
    { crop: 'Cotton (Long Staple)', currentPrice: 7020, previousPrice: 6380 },
    { crop: 'Soyabean (Yellow)', currentPrice: 4720, previousPrice: 4300 },
    { crop: 'Mustard (Black)', currentPrice: 5650, previousPrice: 5050 },
    { crop: 'Groundnut', currentPrice: 6512, previousPrice: 5850 },
    { crop: 'Tur (Arhar)', currentPrice: 10450, previousPrice: 9100 },
];

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const cardHoverVariants: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 17 }
    }
};

const numberCounterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    })
};

const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

export default function DashboardPage() {
    const [user, setUser] = React.useState<any>(null)
    const [schemes, setSchemes] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)
    const [selectedCrop, setSelectedCrop] = React.useState(marketPricesData[0])
    const [hoveredBar, setHoveredBar] = React.useState<string | null>(null)

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
        { label: "Total Crop Stock", value: "500 Qtl", icon: Sprout, color: "text-[#7c9473]", bg: "bg-[#7c9473]/10", desc: "LIVE INVENTORY COUNT" },
        { label: "Warehouse Stock", value: "350 Qtl", icon: Warehouse, color: "text-[#9b7e6b]", bg: "bg-[#9b7e6b]/10", desc: "STORAGE FACILITY" },
        { label: "Shipped Stock", value: "150 Qtl", icon: Truck, color: "text-[#546a7b]", bg: "bg-[#546a7b]/10", desc: "IN TRANSIT" },
        { label: "Pending Payments", value: "₹45,200", icon: CreditCard, color: "text-[#c9a66b]", bg: "bg-[#c9a66b]/10", desc: "OUTSTANDING BALANCE" },
    ]

    return (
        <DashboardLayout pageTitle="">
            <motion.div
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Welcome Block */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
                >
                    <div>
                        <motion.h2
                            className="text-3xl font-black text-[#2d3429] tracking-tighter uppercase leading-none"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Welcome back, {user?.name || "Farmer"}
                        </motion.h2>
                        <motion.p
                            className="text-neutral-400 font-medium text-sm mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Here is what is happening with your farm today.
                        </motion.p>
                    </div>
                    <motion.div
                        className="px-4 py-2 bg-white border border-neutral-100 rounded-xl flex items-center gap-3 shadow-sm font-bold text-[#7c9473] text-xs"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-[#7c9473]"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                        SYSTEM_STABLE // SYNCED
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                        >
                            <motion.div
                                variants={cardHoverVariants}
                                className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm group hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                            >
                                {/* Background decoration */}
                                <motion.div
                                    className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} opacity-20`}
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ duration: 0.5 }}
                                />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <motion.div
                                        className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <stat.icon size={24} />
                                    </motion.div>
                                    <div className="text-right">
                                        <motion.div
                                            className="text-[10px] font-black text-neutral-300 uppercase tracking-widest leading-none mb-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                        >
                                            {stat.desc}
                                        </motion.div>
                                        <motion.div
                                            className="text-[9px] font-bold text-[#7c9473] uppercase tracking-wider"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                        >
                                            LIVE
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.div
                                    className="text-3xl font-black text-[#2d3429] mb-1 relative z-10"
                                    custom={index}
                                    variants={numberCounterVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {stat.value}
                                </motion.div>
                                <motion.div
                                    className="text-sm font-bold text-neutral-500 uppercase tracking-wide"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    {stat.label}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Market Prices Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Crop List */}
                    <motion.div
                        variants={slideInLeft}
                        className="lg:col-span-2 bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#7c9473] to-transparent opacity-20"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />

                        <div className="flex justify-between items-center mb-6">
                            <motion.h3
                                className="font-black text-[#2d3429] uppercase tracking-tighter text-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Market Prices Tracker
                            </motion.h3>
                            <motion.div
                                className="text-[10px] font-black text-neutral-400 uppercase tracking-widest"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                REAL-TIME DATA
                            </motion.div>
                        </div>

                        <div className="flex flex-col gap-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {marketPricesData.map((data, idx) => (
                                <motion.div
                                    key={idx}
                                    onClick={() => setSelectedCrop(data)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx + 0.3 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 rounded-2xl cursor-pointer transition-all border flex justify-between items-center group ${selectedCrop.crop === data.crop ? 'bg-[#7c9473] text-white border-[#7c9473] shadow-lg shadow-[#7c9473]/20' : 'bg-neutral-50 text-[#2d3429] border-transparent hover:bg-neutral-100 hover:shadow-md'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className={`w-2 h-2 rounded-full ${selectedCrop.crop === data.crop ? 'bg-white' : 'bg-[#7c9473]'}`}
                                            animate={selectedCrop.crop === data.crop ? { scale: [1, 1.5, 1] } : {}}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        />
                                        <div className="font-bold text-sm">{data.crop}</div>
                                    </div>
                                    <div className="flex gap-6 text-xs font-bold text-right items-center">
                                        <div className={selectedCrop.crop === data.crop ? 'text-white/90' : 'text-neutral-600'}>
                                            <span className="text-[9px] uppercase tracking-wider block mb-0.5 opacity-70">Current (₹/Qtl)</span>
                                            <span className="text-base">₹{data.currentPrice.toLocaleString()}</span>
                                        </div>
                                        <div className={selectedCrop.crop === data.crop ? 'text-white/70' : 'text-neutral-400'}>
                                            <span className="text-[9px] uppercase tracking-wider block mb-0.5 opacity-70">Previous (₹/Qtl)</span>
                                            <span className="text-base line-through opacity-60">₹{data.previousPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Graph for Selected Crop */}
                    <motion.div
                        variants={slideInRight}
                        className="lg:col-span-1 bg-[#2d3429] rounded-[32px] border border-neutral-100 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden text-white"
                    >
                        {/* Animated background elements */}
                        <motion.div
                            className="absolute top-0 right-0 p-8 opacity-5"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <TrendingUp size={120} />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7c9473]/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        <div className="relative z-10 mb-4">
                            <motion.div
                                className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                SELECTED COMMODITY
                            </motion.div>
                            <motion.div
                                className="text-2xl font-black truncate"
                                key={selectedCrop.crop}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {selectedCrop.crop}
                            </motion.div>
                            <motion.div
                                className="text-sm font-bold text-[#7c9473] mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                PRICE COMPARISON
                            </motion.div>
                        </div>

                        <motion.div
                            className="h-[220px] w-full relative z-10 mt-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[selectedCrop]}
                                    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                                >
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            backgroundColor: '#3f473a',
                                            color: 'white',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                                            fontWeight: 'bold'
                                        }}
                                        itemStyle={{ color: 'white', fontWeight: 'bold' }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: '15px', fontWeight: 'bold', fontSize: '12px' }}
                                        iconType="circle"
                                    />
                                    <Bar
                                        dataKey="previousPrice"
                                        name="Prior Price"
                                        fill="#9b7e6b"
                                        radius={[6, 6, 0, 0]}
                                        maxBarSize={45}
                                        animationDuration={1000}
                                        animationBegin={0}
                                    >
                                        <Cell fill={hoveredBar === 'previous' ? '#b8956f' : '#9b7e6b'} />
                                    </Bar>
                                    <Bar
                                        dataKey="currentPrice"
                                        name="Current Price"
                                        fill="#c9a66b"
                                        radius={[6, 6, 0, 0]}
                                        maxBarSize={45}
                                        animationDuration={1000}
                                        animationBegin={200}
                                    >
                                        <Cell fill={hoveredBar === 'current' ? '#e4b96a' : '#c9a66b'} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Price difference indicator */}
                        <motion.div
                            className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                                Price Change
                            </div>
                            <motion.div
                                className="text-sm font-black text-[#7c9473] flex items-center gap-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                            >
                                <TrendingUp size={16} />
                                +{((selectedCrop.currentPrice - selectedCrop.previousPrice) / selectedCrop.previousPrice * 100).toFixed(1)}%
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Quick Actions or Additional Info */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <motion.div
                        className="bg-gradient-to-br from-[#7c9473]/10 to-transparent p-6 rounded-[24px] border border-[#7c9473]/20"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h4 className="font-black text-[#2d3429] uppercase tracking-tighter mb-2">Quick Tip</h4>
                        <p className="text-sm text-neutral-600 font-medium">
                            Market prices are updated every 15 minutes. Set up price alerts to get notified when your crops hit target prices.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-[#c9a66b]/10 to-transparent p-6 rounded-[24px] border border-[#c9a66b]/20"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h4 className="font-black text-[#2d3429] uppercase tracking-tighter mb-2">Pending Actions</h4>
                        <p className="text-sm text-neutral-600 font-medium">
                            You have 3 pending shipments to confirm and 2 payment invoices awaiting approval.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    )
}