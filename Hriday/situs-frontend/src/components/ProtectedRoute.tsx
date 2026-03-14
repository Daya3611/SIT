"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9f5]">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[#7c9473] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Verifying Session...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
