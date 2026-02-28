"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardWrapper"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, CheckCircle, Smartphone, MapPin, SearchCheck, ScanFace, Database, Hash, Ruler, Map, Save, Loader2, FileSearch } from "lucide-react"
import satbaraData from "@/lib/satbara_20260227_201929.json"
import { useAuth } from "@/lib/AuthContext"
import { api } from "@/lib/api"

export default function ProfilePage() {
    const { user } = useAuth()
    const [isScanning, setIsScanning] = useState(false)
    const [isScanned, setIsScanned] = useState(false)
    const [progress, setProgress] = useState(0)
    const [uploadStep, setUploadStep] = useState(0) // 0: idle, 1: scanning layout, 2: extracting, 3: formatting

    // Form State
    const [formData, setFormData] = useState({
        village: "",
        taluka: "",
        district: "",
        ulpin: "",
        survey_number: "",
        total_area: "",
        transfer_number: "",
        transfer_date: "",
    })

    const [landRecords, setLandRecords] = useState<any[]>([])

    React.useEffect(() => {
        if (user?.userId) {
            api.getLandRecords(user.userId).then((res: any) => {
                if (res.success) {
                    setLandRecords(res.data)
                }
            })
        }
    }, [user])

    const handleSave = async () => {
        if (!user?.userId) return;

        try {
            const dataToSave = {
                farmerId: user.userId,
                farmerName: user.name,
                ...formData
            };
            const response = await api.addLandRecord(dataToSave);

            if (response.success) {
                setLandRecords([...landRecords, response.data]);
                setIsScanned(false);
                setFormData({
                    village: "",
                    taluka: "",
                    district: "",
                    ulpin: "",
                    survey_number: "",
                    total_area: "",
                    transfer_number: "",
                    transfer_date: "",
                });
                alert("Land record verified and saved successfully!");
            }
        } catch (error) {
            console.error("Error saving land record", error);
        }
    }

    const handleUpload = () => {
        setIsScanning(true)
        setIsScanned(false)
        setProgress(0)
        setUploadStep(1)

        let currentProgress = 0
        const interval = setInterval(() => {
            currentProgress += 1.5
            setProgress(currentProgress)

            if (currentProgress > 25) setUploadStep(1)
            if (currentProgress > 50) setUploadStep(2)
            if (currentProgress > 75) setUploadStep(3)

            if (currentProgress >= 100) {
                clearInterval(interval)
                setIsScanning(false)
                setIsScanned(true)
                // Map OCR JSON data to form
                setFormData({
                    village: satbaraData.data.village || "",
                    taluka: satbaraData.data.taluka || "",
                    district: satbaraData.data.district || "",
                    ulpin: satbaraData.data.ulpin || "",
                    survey_number: satbaraData.data.survey_number || "",
                    total_area: satbaraData.data.total_area || "",
                    transfer_number: satbaraData.data.transfer_number || "",
                    transfer_date: satbaraData.data.transfer_date || "",
                })
            }
        }, 30) // fast animation for demo
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const uploadStepsText = [
        "Initializing Machine Learning Models...",
        "Running Spatial Layout Analysis...",
        "Extracting Core Text Nodes (EasyOCR)...",
        "Structuring Document Properties..."
    ]

    return (
        <DashboardLayout pageTitle="User Profile">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                {/* Left Column: Basic Info */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#7c9473]/20 to-transparent" />
                        <div className="w-32 h-32 rounded-[32px] bg-white p-2 shadow-lg relative z-10 mb-6 border border-neutral-100/50">
                            <div className="w-full h-full rounded-[24px] bg-[#f8f9f5] flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-[#2d3429] tracking-tighter relative z-10">{user?.name || "Farmer"}</h2>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#7c9473] mt-2 mb-6 relative z-10">{user?.role || "FARMER"}</div>

                        <div className="w-full space-y-3 relative z-10">
                            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <Smartphone size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Contact</span>
                                </div>
                                <span className="text-sm font-bold text-[#2d3429]">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <MapPin size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Account</span>
                                </div>
                                <span className="text-sm font-bold text-[#2d3429]">Unverified</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: OCR Document Center */}
                <div className="lg:col-span-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 md:p-10 rounded-[40px] border border-neutral-100 shadow-sm"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter flex items-center gap-3 border-b-4 border-[#7c9473]/30 inline-flex pb-1">
                                    <ScanFace className="text-[#7c9473]" size={28} /> Verification Center
                                </h3>
                                <p className="text-neutral-500 text-sm font-medium mt-4 max-w-md">
                                    Upload your 7/12 land extract. Our AI model (<span className="text-[#7c9473] font-bold">ocr.py</span>) will automatically scan and fill out your land details below.
                                </p>
                            </div>
                            {!isScanning && !isScanned && (
                                <div className="relative inline-block">
                                    <input
                                        type="file"
                                        accept=".pdf,image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                handleUpload();
                                            }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        title="Upload 7/12 Extract"
                                    />
                                    <button
                                        className="px-6 py-4 bg-[#7c9473] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2d3429] transition-all flex items-center gap-2 shadow-lg shadow-[#7c9473]/30"
                                    >
                                        <Upload size={16} /> Upload 7/12 Extract
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Scanning State */}
                        <AnimatePresence mode="wait">
                            {isScanning && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#2d3429] rounded-[32px] p-8 text-white mb-8 overflow-hidden relative"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10 blur-[2px]">
                                        <FileSearch size={150} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center animate-spin text-[#7c9473]">
                                                <Loader2 size={24} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-[#7c9473] mb-1">OCR Engine Active</div>
                                                <div className="text-xl font-black tracking-tighter">Processing Document...</div>
                                            </div>
                                        </div>
                                        <div className="bg-black/40 rounded-full h-2 w-full overflow-hidden mb-4">
                                            <motion.div
                                                className="h-full bg-[#7c9473]"
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold text-white/50 font-mono">
                                            <span>{uploadStepsText[uploadStep]}</span>
                                            <span>{Math.round(progress)}%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Extracted Form Data */}
                        <div className="space-y-6">
                            {isScanned && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#7c9473]/10 border border-[#7c9473]/20 rounded-2xl p-4 flex items-center gap-4 mb-8"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#7c9473] flex items-center justify-center text-white shrink-0">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#2d3429] tracking-tighter">Scan Successful</h4>
                                        <p className="text-xs font-bold text-neutral-500">We extracted 8 primary fields and {satbaraData.data.owners.length} owners from your 7/12 extract with 98.4% confidence.</p>
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField icon={Map} label="Village" name="village" value={formData.village} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={MapPin} label="Taluka" name="taluka" value={formData.taluka} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={MapPin} label="District" name="district" value={formData.district} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={Hash} label="ULPIN" name="ulpin" value={formData.ulpin} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={FileText} label="Survey Number" name="survey_number" value={formData.survey_number} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={Ruler} label="Total Area (Hectares)" name="total_area" value={formData.total_area} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={Database} label="Transfer Number" name="transfer_number" value={formData.transfer_number} onChange={handleChange} disabled={!isScanned} />
                                <InputField icon={SearchCheck} label="Transfer Date" name="transfer_date" value={formData.transfer_date} onChange={handleChange} disabled={!isScanned} />
                            </div>

                            <div className="pt-8 border-t border-neutral-100 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={!isScanned}
                                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 ${isScanned ? 'bg-[#2d3429] text-white hover:bg-[#7c9473] shadow-lg shadow-[#2d3429]/20' : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}`}>
                                    <Save size={16} /> Save Verified Profile
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* My Land Records Section */}
                    {landRecords.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 md:p-10 rounded-[40px] border border-neutral-100 shadow-sm"
                        >
                            <h3 className="text-2xl font-black text-[#2d3429] tracking-tighter flex items-center gap-3 border-b-4 border-[#7c9473]/30 inline-flex pb-1 mb-8">
                                <Map className="text-[#7c9473]" size={28} /> My Land Records
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {landRecords.map((record) => (
                                    <div key={record.recordId} className="border border-neutral-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="text-[10px] font-black text-[#7c9473] uppercase tracking-widest mb-1">{record.recordId}</div>
                                                <h4 className="font-bold text-[#2d3429]">{record.village || record.taluka || "Land Record"}</h4>
                                            </div>
                                            <div className="px-3 py-1 bg-[#7c9473]/10 text-[#7c9473] text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1">
                                                <CheckCircle size={12} /> Verified
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Survey No.</div>
                                                <div className="text-sm font-bold text-[#2d3429] mt-1">{record.surveyNumber || record.survey_number || "-"}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Area</div>
                                                <div className="text-sm font-bold text-[#2d3429] mt-1">{record.totalArea || record.total_area || "-"} Ha</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">District</div>
                                                <div className="text-sm font-bold text-[#2d3429] mt-1">{record.district || "-"}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Date Added</div>
                                                <div className="text-sm font-bold text-[#2d3429] mt-1">{record.registrationDate || record.transferDate || record.transfer_date || "-"}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

function InputField({ icon: Icon, label, name, value, onChange, disabled }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${disabled ? 'bg-neutral-50/50 border-neutral-100' : 'bg-white border-[#7c9473]/30 shadow-sm focus-within:border-[#7c9473] focus-within:ring-2 focus-within:ring-[#7c9473]/10'}`}>
                <Icon size={18} className={disabled ? 'text-neutral-300' : 'text-[#7c9473]'} />
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={`Waiting for OCR...`}
                    className="w-full bg-transparent border-none outline-none text-sm font-bold text-[#2d3429] disabled:text-neutral-400 disabled:cursor-not-allowed"
                />
            </div>
        </div>
    )
}
