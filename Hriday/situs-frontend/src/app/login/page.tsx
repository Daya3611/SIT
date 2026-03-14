"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/AuthContext"
import { Sprout, ShoppingBag, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const { login, register, isAuthenticated } = useAuth()
    const router = useRouter()

    const [mode, setMode] = useState<"login" | "register">("login")
    const [role, setRole] = useState<"farmer" | "buyer">("farmer")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard")
        }
    }, [isAuthenticated, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        if (mode === "login") {
            const result = await login(email, password)
            if (result.success) {
                setSuccess("Login successful! Redirecting...")
                setTimeout(() => router.push("/dashboard"), 800)
            } else {
                setError(result.message)
            }
        } else {
            if (!name.trim()) {
                setError("Name is required.")
                setLoading(false)
                return
            }
            const result = await register({ name, email, password, role })
            if (result.success) {
                setSuccess("Account created! Redirecting...")
                setTimeout(() => router.push("/dashboard"), 800)
            } else {
                setError(result.message)
            }
        }
        setLoading(false)
    }

    return (
        <main className="min-h-screen bg-[#fdfdfb] flex">
            {/* Left — Branding Panel */}
            <div className="hidden lg:flex w-[480px] bg-[#2d3429] flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 -right-20 w-80 h-80 border border-white/20 rounded-full" />
                    <div className="absolute bottom-20 -left-20 w-60 h-60 border border-white/20 rounded-full" />
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#7c9473] rounded-xl flex items-center justify-center text-white font-black text-xs">A</div>
                        <span className="font-black tracking-tighter text-lg text-white">DBT-Connect</span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-[0.95]">
                        Secure your<br />agricultural<br />future.
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                        Connect your farm to government schemes, access credit, trade on the marketplace, and manage everything in one unified platform.
                    </p>
                    <div className="flex gap-6 pt-4">
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#7c9473]">15+</div>
                            <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Schemes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#7c9473]">11.8Cr</div>
                            <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Farmers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#7c9473]">1389+</div>
                            <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Mandis</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    © 2026 DBT-Connect • SIT Project
                </div>
            </div>

            {/* Right — Auth Form */}
            <div className="flex-grow flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#7c9473] rounded-xl flex items-center justify-center text-white font-black text-xs">A</div>
                            <span className="font-black tracking-tighter text-lg text-[#2d3429]">DBT-Connect</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-black text-[#2d3429] tracking-tighter">
                            {mode === "login" ? "Welcome back." : "Create your account."}
                        </h1>
                        <p className="text-neutral-400 text-sm font-medium mt-2">
                            {mode === "login"
                                ? "Sign in to access your dashboard, schemes, and marketplace."
                                : "Join DBT-Connect as a Farmer or Buyer to get started."
                            }
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-neutral-100 rounded-2xl p-1.5">
                        <button
                            onClick={() => { setMode("login"); setError(""); setSuccess("") }}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "login" ? "bg-white text-[#2d3429] shadow-sm" : "text-neutral-400"}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setMode("register"); setError(""); setSuccess("") }}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "register" ? "bg-white text-[#2d3429] shadow-sm" : "text-neutral-400"}`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Role Selector (Register only) */}
                    <AnimatePresence mode="wait">
                        {mode === "register" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3">I am a</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole("farmer")}
                                        className={`p-6 rounded-3xl border-2 transition-all text-left ${role === "farmer"
                                            ? "border-[#7c9473] bg-[#7c9473]/5 shadow-lg shadow-[#7c9473]/10"
                                            : "border-neutral-100 hover:border-neutral-200"
                                            }`}
                                    >
                                        <Sprout className={`mb-3 ${role === "farmer" ? "text-[#7c9473]" : "text-neutral-300"}`} size={28} />
                                        <div className="text-sm font-black text-[#2d3429]">Farmer</div>
                                        <div className="text-[10px] font-bold text-neutral-400 mt-1">Access schemes, loans & sell produce</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("buyer")}
                                        className={`p-6 rounded-3xl border-2 transition-all text-left ${role === "buyer"
                                            ? "border-[#c9a66b] bg-[#c9a66b]/5 shadow-lg shadow-[#c9a66b]/10"
                                            : "border-neutral-100 hover:border-neutral-200"
                                            }`}
                                    >
                                        <ShoppingBag className={`mb-3 ${role === "buyer" ? "text-[#c9a66b]" : "text-neutral-300"}`} size={28} />
                                        <div className="text-sm font-black text-[#2d3429]">Buyer</div>
                                        <div className="text-[10px] font-bold text-neutral-400 mt-1">Browse marketplace & buy produce</div>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field (Register only) */}
                        <AnimatePresence mode="wait">
                            {mode === "register" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">
                                        {role === "farmer" ? "Full Name" : "Business Name"}
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={role === "farmer" ? "e.g. Rajesh Kumar" : "e.g. Vikram Agri Traders"}
                                        className="w-full bg-white border border-neutral-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7c9473]/20 focus:border-[#7c9473] transition-all text-[#2d3429]"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. rajesh@example.com"
                                required
                                className="w-full bg-white border border-neutral-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7c9473]/20 focus:border-[#7c9473] transition-all text-[#2d3429]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-white border border-neutral-100 rounded-2xl py-4 px-6 pr-14 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#7c9473]/20 focus:border-[#7c9473] transition-all text-[#2d3429]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error / Success Messages */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100"
                                >
                                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                                    <span className="text-xs font-bold text-red-600">{error}</span>
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100"
                                >
                                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                                    <span className="text-xs font-bold text-green-700">{success}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-[#2d3429] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#7c9473] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    {mode === "login" ? "Sign In" : `Register as ${role}`}
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    {mode === "login" && (
                        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 space-y-3">
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Demo Accounts</div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setEmail("rajesh@example.com"); setPassword("farmer123") }}
                                    className="p-3 bg-white rounded-xl border border-neutral-100 text-left hover:border-[#7c9473]/30 transition-all"
                                >
                                    <div className="text-[9px] font-black text-[#7c9473] uppercase tracking-widest">Farmer</div>
                                    <div className="text-xs font-bold text-[#2d3429] mt-1">Rajesh Kumar</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEmail("vikram@example.com"); setPassword("buyer123") }}
                                    className="p-3 bg-white rounded-xl border border-neutral-100 text-left hover:border-[#c9a66b]/30 transition-all"
                                >
                                    <div className="text-[9px] font-black text-[#c9a66b] uppercase tracking-widest">Buyer</div>
                                    <div className="text-xs font-bold text-[#2d3429] mt-1">Vikram Traders</div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Back to Home */}
                    <div className="text-center">
                        <Link href="/" className="text-xs font-bold text-neutral-400 hover:text-[#7c9473] transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
