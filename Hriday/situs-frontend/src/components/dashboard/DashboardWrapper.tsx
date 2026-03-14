"use client"

import React from "react"
import { NavBar } from "@/components/NavBar"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Footer } from "@/components/Footer"

export default function DashboardLayout({
    children,
    pageTitle = "Dashboard"
}: {
    children: React.ReactNode
    pageTitle?: string
}) {
    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-[#f8f9f5]">
                <NavBar />
                <main className="flex-grow pt-32 px-6 pb-24">
                    <div className="max-w-7xl mx-auto">
                        {pageTitle && (
                            <div className="mb-10">
                                <h1 className="text-4xl font-black text-[#2d3429] uppercase tracking-tighter leading-none">{pageTitle}</h1>
                                <div className="h-1 w-20 bg-[#7c9473] mt-4 rounded-full" />
                            </div>
                        )}
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    )
}
