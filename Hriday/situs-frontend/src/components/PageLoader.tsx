"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LoaderInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Start with loader visible on first load
    const [isLoading, setIsLoading] = useState(true);

    // Track previous path/search to trigger loader synchronously before render
    const [prevPath, setPrevPath] = useState(pathname);
    const currentSearch = searchParams?.toString() || "";
    const [prevSearch, setPrevSearch] = useState(currentSearch);

    // If path changes, show loader immediately
    if (pathname !== prevPath || currentSearch !== prevSearch) {
        setIsLoading(true);
        setPrevPath(pathname);
        setPrevSearch(currentSearch);
    }

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000); // 3 seconds delay

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="page-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#2d3429]"
                >
                    {/* Video Background */}
                    <div className="absolute inset-0 bg-[#2d3429] flex items-center justify-center">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            src="/loder.mp4"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function PageLoader() {
    return (
        <Suspense fallback={null}>
            <LoaderInner />
        </Suspense>
    );
}
