"use client"

import React, { useState, useEffect } from "react"
import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import {
    Store,
    Search,
    Filter,
    ShoppingCart,
    ArrowRight,
    ShieldCheck,
    Star,
    X,
    Plus,
    Minus,
    Trash2,
    CheckCircle2,
    Package,
    ArrowUpRight,
    BadgePercent
} from "lucide-react"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import ProtectedRoute from "@/components/ProtectedRoute"

interface Product {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    unit: string;
    seller: string;
    rating: number;
    description?: string;
}

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState("All")
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isOrdering, setIsOrdering] = useState(false)

    useEffect(() => {
        api.getProducts().then(res => {
            if (res.success) setProducts(res.data)
            setLoading(false)
        })
    }, [])

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { product, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const handleCheckout = () => {
        setIsOrdering(true)
        // Simulate processing multiple cart items as individual orders or a bulk order
        const orderPromises = cart.map(item =>
            api.placeOrder({ productId: item.product.id, quantity: item.quantity, buyerId: "FARMER-8821" })
        )

        Promise.all(orderPromises).then(responses => {
            const allSuccess = responses.every(res => res.success)
            if (allSuccess) {
                alert(`Successfully processed ${cart.length} item(s)!`)
                setCart([])
                setIsCartOpen(false)
            } else {
                alert("Some items could not be processed. Please try again.")
            }
            setIsOrdering(false)
        }).catch(() => {
            alert("Error connecting to the blockchain ledger.")
            setIsOrdering(false)
        })
    }

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === productId) {
                const newQty = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }))
    }

    const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

    const categories = ["All", "Seeds", "Fertilizer", "Tools", "Crops"]

    const filteredProducts = products.filter(p => {
        const matchesCategory = category === "All" || p.category === category
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.seller.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <ProtectedRoute>
            <main className="relative min-h-screen bg-[#fdfdfb] selection:bg-[#7c9473] selection:text-white pt-20">
                <NavBar />

                {/* Premium Header Section */}
                <div className="relative overflow-hidden bg-[#2d3429] py-32 px-6">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#7c9473] rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#c9a66b] rounded-full blur-[120px] animate-pulse delay-1000" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 text-[#7c9473] mb-8"
                        >
                            <ShieldCheck size={14} /> Immutable Quality Assurance
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white mb-8"
                        >
                            The Agri<span className="text-[#7c9473]">Market.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl text-white/40 font-medium text-lg leading-relaxed mb-12"
                        >
                            A next-generation platform for farmers. Direct access to verified produce, equipment, and resources—secured by blockchain technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-8"
                        >
                            {[
                                { label: "Verified Sellers", value: "4.8k+" },
                                { label: "Daily Transactions", value: "₹2.4M" },
                                { label: "QC Checked", value: "100%" }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-2xl font-black text-white">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-100 py-6 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="relative group w-full md:w-96">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#7c9473] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Find seeds, tools, or sellers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#f8f9f5] border border-neutral-200 rounded-[20px] py-4 pl-14 pr-6 text-sm font-bold text-[#2d3429] focus:outline-none focus:border-[#7c9473] focus:ring-4 focus:ring-[#7c9473]/5 transition-all shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex gap-1 bg-[#f8f9f5] p-1.5 rounded-2xl border border-neutral-200 w-full md:w-auto overflow-x-auto no-scrollbar">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={cn(
                                            "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                            category === cat
                                                ? "bg-white text-[#2d3429] shadow-sm border border-neutral-100"
                                                : "text-neutral-400 hover:text-[#2d3429] hover:bg-white/50"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-4 bg-[#2d3429] text-white rounded-2xl shadow-xl hover:bg-[#7c9473] transition-all shrink-0 hover:scale-105"
                            >
                                <ShoppingCart size={20} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7c9473] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Display */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-[500px] bg-[#f8f9f5] rounded-[48px] animate-pulse border border-neutral-100" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group bg-white rounded-[48px] overflow-hidden border border-neutral-100 hover:border-[#7c9473]/30 hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="h-72 relative">
                                            <div className="absolute inset-0 bg-neutral-100 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#2d3429]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-[#2d3429] border border-white/20 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#7c9473] animate-pulse" />
                                                {product.category}
                                            </div>

                                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#2d3429] hover:bg-white transition-all shadow-xl"
                                                >
                                                    <ArrowUpRight size={20} />
                                                </button>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="h-12 px-6 bg-[#7c9473] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-xl hover:bg-[#6a8062] transition-all"
                                                >
                                                    <ShoppingCart size={16} /> Add to Cart
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter leading-none mb-2">{product.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">by {product.seller}</span>
                                                        <div className="w-1 h-1 rounded-full bg-neutral-200" />
                                                        <div className="flex items-center gap-1 text-[#c9a66b]">
                                                            <Star size={10} fill="currentColor" />
                                                            <span className="text-[10px] font-black">{product.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-black text-[#7c9473] leading-none">₹{product.price}</div>
                                                    <div className="text-[10px] font-bold text-neutral-300 uppercase mt-1">/{product.unit}</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="px-3 py-1 bg-[#7c9473]/10 text-[#7c9473] text-[8px] font-black uppercase rounded-lg border border-[#7c9473]/10">Organic Verified</div>
                                                <div className="px-3 py-1 bg-[#c9a66b]/10 text-[#c9a66b] text-[8px] font-black uppercase rounded-lg border border-[#c9a66b]/10">Free Delivery</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Cart Drawer */}
                <AnimatePresence>
                    {isCartOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCartOpen(false)}
                                className="fixed inset-0 bg-[#2d3429]/60 backdrop-blur-xl z-[100]"
                            />
                            <motion.aside
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-[110] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col"
                            >
                                <div className="p-10 border-b border-neutral-100 flex justify-between items-center">
                                    <div className="space-y-1">
                                        <h2 className="text-3xl font-black tracking-tighter uppercase text-[#2d3429]">Your Basket.</h2>
                                        <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{cart.length} items ready for checkout</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-12 h-12 rounded-2xl bg-[#f8f9f5] flex items-center justify-center text-[#2d3429] hover:bg-neutral-100 transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex-grow overflow-y-auto p-10 space-y-8 no-scrollbar">
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                            <Package size={80} strokeWidth={1} className="mb-6 text-neutral-300" />
                                            <h3 className="text-lg font-black uppercase text-neutral-400">Your basket is empty</h3>
                                            <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest mt-2">Browse the market to add produce</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.product.id} className="flex gap-6 group">
                                                <div className="w-24 h-24 rounded-3xl bg-[#f8f9f5] overflow-hidden shrink-0 border border-neutral-100 group-hover:border-[#7c9473]/30 transition-all">
                                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow space-y-2">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-black text-[#2d3429] uppercase tracking-tighter">{item.product.name}</h4>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="text-neutral-300 hover:text-red-400 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">₹{item.product.price} / {item.product.unit}</div>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex items-center gap-3 bg-[#f8f9f5] rounded-xl p-1 border border-neutral-100">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, -1)}
                                                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm text-[#2d3429] transition-all"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="text-sm font-black tabular-nums min-w-[20px] text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, 1)}
                                                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm text-[#2d3429] transition-all"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <div className="text-sm font-black text-[#7c9473]">₹{item.product.price * item.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {cart.length > 0 && (
                                    <div className="p-10 bg-[#f8f9f5] border-t border-neutral-200 space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                                <span>Subtotal</span>
                                                <span className="text-[#2d3429]">₹{cartTotal}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                                <span>Tax & QC Fee (2%)</span>
                                                <span className="text-[#2d3429]">₹{(cartTotal * 0.02).toFixed(0)}</span>
                                            </div>
                                            <div className="flex justify-between items-end pt-4 border-t border-neutral-200">
                                                <span className="text-lg font-black uppercase tracking-tighter text-[#2d3429]">Total Payable</span>
                                                <span className="text-3xl font-black text-[#7c9473]">₹{(cartTotal * 1.02).toFixed(0)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            disabled={isOrdering}
                                            className="w-full py-6 bg-[#2d3429] text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-4 hover:bg-[#7c9473] transition-all shadow-2xl shadow-[#2d3429]/20 disabled:opacity-50"
                                        >
                                            {isOrdering ? "Processing on Ledger..." : (
                                                <>Confirm Selection <ArrowRight size={18} /></>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Product Quick View */}
                <AnimatePresence>
                    {selectedProduct && (
                        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProduct(null)}
                                className="absolute inset-0 bg-[#2d3429]/80 backdrop-blur-2xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: 20 }}
                                className="relative w-full max-w-5xl bg-white rounded-[64px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                            >
                                <div className="md:w-1/2 h-[400px] md:h-auto bg-neutral-100 relative">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-10 left-10 p-4 bg-white/90 backdrop-blur-md rounded-3xl flex items-center gap-3 shadow-xl">
                                        <div className="w-12 h-12 rounded-2xl bg-[#7c9473]/10 text-[#7c9473] flex items-center justify-center">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#2d3429]">Certified Source</div>
                                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">ID #8821-V-Consensus</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-1/2 p-12 md:p-20 space-y-10 flex flex-col justify-center">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="px-5 py-2 bg-[#7c9473]/10 text-[#7c9473] text-[10px] font-black uppercase rounded-full tracking-widest">
                                                {selectedProduct.category}
                                            </div>
                                            <button
                                                onClick={() => setSelectedProduct(null)}
                                                className="p-3 text-neutral-300 hover:text-[#2d3429] transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                        <h2 className="text-5xl font-black text-[#2d3429] tracking-tighter leading-none">{selectedProduct.name}</h2>
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl font-black text-[#7c9473]">₹{selectedProduct.price}</div>
                                            <div className="text-xl font-bold text-neutral-300 lowercase italic">per {selectedProduct.unit}</div>
                                        </div>
                                    </div>

                                    <p className="text-neutral-400 font-medium leading-relaxed">
                                        Harvested directly from {selectedProduct.seller}'s verified land parcels. Each unit is inspected by our IoT sensors for moisture levels and nutrient density before listing.
                                    </p>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="p-6 bg-[#f8f9f5] rounded-3xl border border-neutral-100 flex items-center gap-4">
                                            <BadgePercent className="text-[#c9a66b]" size={24} strokeWidth={3} />
                                            <div>
                                                <div className="text-lg font-black text-[#2d3429] leading-none">80%</div>
                                                <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Farmer Margin</div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-[#f8f9f5] rounded-3xl border border-neutral-100 flex items-center gap-4">
                                            <Star className="text-[#c9a66b]" size={24} fill="currentColor" />
                                            <div>
                                                <div className="text-lg font-black text-[#2d3429] leading-none">{selectedProduct.rating}</div>
                                                <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Market Rating</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                addToCart(selectedProduct)
                                                setSelectedProduct(null)
                                            }}
                                            className="flex-grow py-6 bg-[#2d3429] text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-4 hover:bg-[#7c9473] transition-all shadow-2xl shadow-[#2d3429]/20"
                                        >
                                            Add to Basket <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <Footer />
            </main>
        </ProtectedRoute>
    )
}
