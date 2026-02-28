"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

const API_BASE = "http://localhost:3001/api"

interface User {
    userId: string
    name: string
    email: string
    role: "farmer" | "buyer"
    phone?: string
    village?: string
    district?: string
    state?: string
    landSize?: number
    crops?: string[]
    kycStatus?: string
    businessName?: string
    businessType?: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    register: (data: RegisterData) => Promise<{ success: boolean; message: string }>
    logout: () => void
}

interface RegisterData {
    name: string
    email: string
    password: string
    role: "farmer" | "buyer"
    phone?: string
    village?: string
    district?: string
    state?: string
    businessName?: string
    businessType?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Restore session from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem("agri_token")
        const savedUser = localStorage.getItem("agri_user")
        if (savedToken && savedUser) {
            try {
                setToken(savedToken)
                setUser(JSON.parse(savedUser))
            } catch {
                localStorage.removeItem("agri_token")
                localStorage.removeItem("agri_user")
            }
        }
        setIsLoading(false)
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()

            if (data.success) {
                setUser(data.data.user)
                setToken(data.data.token)
                localStorage.setItem("agri_token", data.data.token)
                localStorage.setItem("agri_user", JSON.stringify(data.data.user))
                return { success: true, message: data.message }
            }
            return { success: false, message: data.message }
        } catch {
            return { success: false, message: "Network error. Please try again." }
        }
    }, [])

    const register = useCallback(async (registerData: RegisterData) => {
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData)
            })
            const data = await res.json()

            if (data.success) {
                setUser(data.data.user)
                setToken(data.data.token)
                localStorage.setItem("agri_token", data.data.token)
                localStorage.setItem("agri_user", JSON.stringify(data.data.user))
                return { success: true, message: data.message }
            }
            return { success: false, message: data.message }
        } catch {
            return { success: false, message: "Network error. Please try again." }
        }
    }, [])

    const logout = useCallback(() => {
        if (token) {
            fetch(`${API_BASE}/auth/logout`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            }).catch(() => { })
        }
        setUser(null)
        setToken(null)
        localStorage.removeItem("agri_token")
        localStorage.removeItem("agri_user")
    }, [token])

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
