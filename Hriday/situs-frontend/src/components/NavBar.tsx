"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight, Wallet, CreditCard, Target, FileText, Info, ShieldCheck, Store } from "lucide-react"
import { cn } from "@/lib/utils"

const MAIN_LINKS = [
    { name: "Home", href: "/" },
    { name: "All Schemes", href: "/schemes" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Contact", href: "/contact" },
]

const MENU_LINKS = [
    { name: "Loan Portal", href: "/dashboard/kcc", icon: Wallet, desc: "Agri-Business & Crop Loans." },
    { name: "Marketplace", href: "/marketplace", icon: Store, desc: "Buy verified seeds and tools." },
    { name: "Document Vault", href: "/dashboard/vault", icon: FileText, desc: "Secure digital locker." },
    { name: "Status Tracker", href: "/dashboard/status", icon: Target, desc: "Track application progress." },
]

export function NavBar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Only apply aggressive scroll-hiding on the home page (for the video)
    const isHomePage = pathname === "/"

    useEffect(() => {
        const handleScroll = () => {
            // On home page, we want the navbar to eventually fade to allow the full video experience.
            // On other pages, it just gets a background.
            setIsScrolled(window.scrollY > 50)
        }

        // Initial check
        handleScroll()

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <>
            <div
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                    isScrolled ? "bg-white/10 backdrop-blur-md border-b border-white/10 py-4 shadow-xl shadow-black/5" : "py-6",
                    "opacity-100"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#7c9473] rounded-xl flex items-center justify-center text-white font-black text-xs group-hover:bg-[#2d3429] transition-colors relative overflow-hidden">
                            <span className="relative z-10">A</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </div>
                        <span className={cn(
                            "font-black tracking-tighter text-lg hidden sm:block",
                            isHomePage && !isScrolled ? "text-white" : "text-[#2d3429]"
                        )}>
                            AgriPayChain
                        </span>
                    </Link>

                    {/* Main Desktop Links */}
                    <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-lg p-1.5 rounded-2xl border border-white/20 shadow-xl">
                        {MAIN_LINKS.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors",
                                        isActive ? "text-[#2d3429] bg-white shadow-sm" :
                                            isHomePage && !isScrolled ? "text-white/70 hover:text-white" : "text-neutral-500 hover:text-[#2d3429]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="hidden sm:flex px-6 py-3 bg-[#2d3429] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7c9473] transition-all items-center gap-2 shadow-xl shadow-[#2d3429]/20">
                            Launch App <ArrowRight size={14} />
                        </Link>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={cn(
                                "p-3 rounded-xl transition-colors",
                                isMenuOpen ? "bg-white text-[#2d3429] shadow-sm" :
                                    isHomePage && !isScrolled ? "text-white hover:bg-white/10" : "text-[#2d3429] bg-neutral-100 hover:bg-neutral-200"
                            )}
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Full Screen Dropdown Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[90] bg-[#fdfdfb] pt-32 px-6 pb-12 overflow-y-auto"
                    >
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Menu Links */}
                            <div className="space-y-12">
                                {/* Mobile Main Links (Visible only on small screens) */}
                                <div className="md:hidden flex flex-col gap-6">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">Primary Routes</div>
                                    {MAIN_LINKS.map(link => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="text-4xl font-black text-[#2d3429] tracking-tighter hover:text-[#7c9473] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Secondary Menu Links */}
                                <div className="flex flex-col gap-8">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">Platform Features</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {MENU_LINKS.map((link, i) => (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="block p-6 bg-white rounded-3xl border border-neutral-100 hover:border-[#7c9473]/30 hover:shadow-xl hover:shadow-[#7c9473]/5 transition-all group"
                                                >
                                                    <div className="w-12 h-12 rounded-2xl bg-[#f8f9f5] text-[#7c9473] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#7c9473] group-hover:text-white transition-all duration-300">
                                                        <link.icon size={20} />
                                                    </div>
                                                    <h4 className="text-lg font-black text-[#2d3429] mb-2">{link.name}</h4>
                                                    <p className="text-xs font-bold text-neutral-400">{link.desc}</p>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Menu Sidebar / Highlight */}
                            <div className="bg-[#2d3429] rounded-[48px] p-12 text-white relative overflow-hidden flex flex-col justify-end min-h-[400px]">
                                <div className="absolute top-0 right-0 p-12 opacity-10">
                                    <ShieldCheck size={120} />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[10px] bg-white/10 w-fit px-4 py-1.5 rounded-full font-black uppercase tracking-widest mb-6">Farmer Access</div>
                                    <h3 className="text-4xl font-black tracking-tighter mb-4">Enter the Ecosystem.</h3>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">
                                        Connect your wallet, register your land, and secure your crop lifecycle entirely on-chain.
                                    </p>
                                    <Link href="/dashboard" className="inline-flex px-8 py-4 bg-[#7c9473] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#6a8062] transition-colors gap-3 items-center">
                                        Launch Farm Portal <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
