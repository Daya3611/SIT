"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    CreditCard,
    ScanSearch,
    HelpingHand,
    LogOut,
    Settings,
    Bell,
    Banknote
} from "lucide-react"
import { cn } from "@/lib/utils"

const MENU_ITEMS = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Scheme Scanner", icon: ScanSearch, href: "/dashboard/scheme" },
    { name: "KCC Portal", icon: CreditCard, href: "/dashboard/kcc" },
    { name: "Application Status", icon: HelpingHand, href: "/dashboard/status" },
    { name: "Documents Vault", icon: FileText, href: "/dashboard/vault" },
    { name: "Financial Insights", icon: Banknote, href: "/dashboard/insights" },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-72 bg-[#2d3429] h-screen fixed left-0 top-0 flex flex-col p-6 z-50 shadow-2xl">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-[#7c9473] rounded-xl flex items-center justify-center text-white font-black">A</div>
                <div className="flex flex-col">
                    <span className="text-white font-black text-sm tracking-tighter uppercase leading-none">AgriPayChain</span>
                    <span className="text-[#7c9473] text-[9px] font-bold uppercase tracking-widest mt-1">Farmer Portal</span>
                </div>
            </div>

            <nav className="flex-grow space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group",
                                isActive
                                    ? "bg-[#7c9473] text-white shadow-lg shadow-[#7c9473]/20"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={20} className={cn("transition-colors", isActive ? "text-white" : "text-white/30 group-hover:text-white/60")} />
                            <span className="text-sm font-bold tracking-tight">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="pt-6 border-t border-white/5 mt-auto space-y-1">
                <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all outline-none">
                    <Settings size={20} className="text-white/30" />
                    <span className="text-sm font-bold">Settings</span>
                </button>
                <Link href="/" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400 opacity-60 hover:opacity-100 hover:bg-red-400/5 transition-all">
                    <LogOut size={20} />
                    <span className="text-sm font-bold">Log Out</span>
                </Link>
            </div>
        </aside>
    )
}

export function DashboardHeader({ title }: { title: string }) {
    return (
        <header className="h-20 bg-white border-bottom border-neutral-100 flex justify-between items-center px-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
            <h1 className="text-xl font-black text-[#2d3429] uppercase tracking-tighter">{title}</h1>

            <div className="flex items-center gap-6">
                <button className="p-2 text-neutral-400 hover:text-[#7c9473] transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <div className="h-8 w-px bg-neutral-100" />
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-xs font-black text-[#2d3429] uppercase leading-none">Rajesh Kumar</div>
                        <div className="text-[9px] font-bold text-[#7c9473] uppercase mt-1 tracking-widest">Village ID: #8821</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-[#7c9473]/20 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    )
}
