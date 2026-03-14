"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const frameCount = 96

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount])

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        const framesPath = "/frames/ezgif-frame-"

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image()
            img.src = `${framesPath}${i.toString().padStart(3, '0')}.png`
            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setImages(loadedImages)
                }
            }
            loadedImages[i] = img
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")

        if (!canvas || !context || images.length === 0) return

        const unsubscribe = frameIndex.on("change", (latest) => {
            const index = Math.floor(latest)
            const img = images[index]
            if (img) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        })

        const img = images[1]
        if (img) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
        }

        return () => unsubscribe()
    }, [images, frameIndex])

    return (
        <div id="visual-flow" ref={containerRef} className="relative h-[300vh] bg-[#fdfdfb] border-y border-neutral-100">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#2d3429]/30 font-bold text-[10px] uppercase tracking-[0.5em] animate-pulse">
                    SCROLL_TO_SEE_THE_JOURNEY
                </div>
            </div>
        </div>
    )
}
