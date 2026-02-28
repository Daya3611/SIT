"use client"

import React from "react"
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard/DashboardShell"

export default function DashboardLayout({
    children,
    pageTitle = "Dashboard"
}: {
    children: React.ReactNode
    pageTitle?: string
}) {
    return (
        <div className="flex min-h-screen bg-[#f8f9f5]">
            <DashboardSidebar />
            <main className="flex-grow pl-72">
                <DashboardHeader title={pageTitle} />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
