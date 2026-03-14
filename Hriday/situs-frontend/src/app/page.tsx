"use client"

import React from "react"
import { NavBar } from "@/components/NavBar"
import { HeroSection } from "@/components/landing/HeroSection"
import { ScrollSequence } from "@/components/ScrollSequence"
import { Footer } from "@/components/Footer"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#fdfdfb] selection:bg-[#7c9473] selection:text-white pb-0">
      <NavBar />

      {/* Video Scroll comes absolutely first as requested by the user */}
      <ScrollSequence />

      {/* Followed by the Hero / Welcome text */}
      <HeroSection />

      <Footer />
    </main>
  )
}
