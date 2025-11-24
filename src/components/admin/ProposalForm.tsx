"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../../lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Proposal, defaultProposal } from "../../types/proposal";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Save, Palette, LayoutGrid, DollarSign, User, ChevronRight } from "lucide-react";
import Switch from "../ui/Switch";
import { useToast } from "../ui/Toast";

interface ProposalFormProps {
    initialData?: Proposal;
    isEditing?: boolean;
}

const tabs = [
    { id: "basic", label: "Dados do Cliente", icon: User },
    { id: "branding", label: "Identidade Visual", icon: Palette },
    { id: "modules", label: "Módulos", icon: LayoutGrid },
    { id: "pricing", label: "Investimento", icon: DollarSign },
];

export default function ProposalForm({ initialData, isEditing = false }: ProposalFormProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Proposal>(initialData || defaultProposal);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState("basic");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section: "branding" | "pricing", field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleModuleChange = (module: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            modules: { ...prev.modules, [module]: checked },
        }));
    };

    const handleLogoUpload = async () => {
        if (!logoFile) return formData.branding.logoUrl;

        const storageRef = ref(storage, `logos/${Date.now()}_${logoFile.name}`);
        await uploadBytes(storageRef, logoFile);
        return await getDownloadURL(storageRef);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!db || !storage) {
            showToast("Modo Demo: Alterações simuladas com sucesso!", "info");
            setTimeout(() => router.push("/admin"), 1500);
            return;
        }

        try {
            const logoUrl = await handleLogoUpload();

            const dataToSave = {
                ...formData,
                branding: { ...formData.branding, logoUrl },
                updatedAt: new Date().toISOString(),
            };

            if (isEditing && initialData?.id) {
                await updateDoc(doc(db, "proposals", initialData.id), dataToSave);
            } else {
                await addDoc(collection(db, "proposals"), {
                    ...dataToSave,
                    createdAt: new Date().toISOString()
                });
            }

            showToast("Proposta salva com sucesso!", "success");
            setTimeout(() => router.push("/admin"), 1000);
        } catch (error) {
            console.error("Error saving proposal:", error);
            showToast("Erro ao salvar proposta.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                : "text-slate-600 hover:bg-white hover:shadow-sm"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 relative">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {activeTab === "basic" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-slate-800">Informações Básicas</h2>
                                        <div className="grid gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Cliente</label>
                                                <input
                                                    type="text"
                                                    name="clientName"
                                                    value={formData.clientName}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                    placeholder="Ex: Clínica Santa Maria"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                                                <div className="flex items-center">
                                                    <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg px-3 py-3 text-sm text-slate-500">/p/</span>
                                                    <input
                                                        type="text"
                                                        name="slug"
                                                        value={formData.slug}
                                                        onChange={handleChange}
                                                        className="flex-1 rounded-r-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                        placeholder="clinica-santa-maria"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Data da Proposta</label>
                                                <input
                                                    type="text"
                                                    name="proposalDate"
                                                    value={formData.proposalDate}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                    placeholder="Ex: Novembro 2025"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "branding" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-slate-800">Identidade Visual</h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cor Primária</label>
                                                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                                        <input
                                                            type="color"
                                                            value={formData.branding.primaryColor}
                                                            onChange={(e) => handleNestedChange("branding", "primaryColor", e.target.value)}
                                                            className="h-10 w-10 rounded cursor-pointer border-0 bg-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={formData.branding.primaryColor}
                                                            onChange={(e) => handleNestedChange("branding", "primaryColor", e.target.value)}
                                                            className="bg-transparent text-sm font-mono text-slate-600 outline-none w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cor de Destaque (Accent)</label>
                                                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                                        <input
                                                            type="color"
                                                            value={formData.branding.accentColor}
                                                            onChange={(e) => handleNestedChange("branding", "accentColor", e.target.value)}
                                                            className="h-10 w-10 rounded cursor-pointer border-0 bg-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={formData.branding.accentColor}
                                                            onChange={(e) => handleNestedChange("branding", "accentColor", e.target.value)}
                                                            className="bg-transparent text-sm font-mono text-slate-600 outline-none w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cor Escura (Hero)</label>
                                                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                                        <input
                                                            type="color"
                                                            value={formData.branding.darkColor}
                                                            onChange={(e) => handleNestedChange("branding", "darkColor", e.target.value)}
                                                            className="h-10 w-10 rounded cursor-pointer border-0 bg-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={formData.branding.darkColor}
                                                            onChange={(e) => handleNestedChange("branding", "darkColor", e.target.value)}
                                                            className="bg-transparent text-sm font-mono text-slate-600 outline-none w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Logotipo</label>
                                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    {logoFile ? (
                                                        <div className="text-sm text-emerald-600 font-medium flex items-center gap-2">
                                                            <Upload className="w-4 h-4" /> {logoFile.name}
                                                        </div>
                                                    ) : formData.branding.logoUrl ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <img src={formData.branding.logoUrl} alt="Logo atual" className="h-12 object-contain mb-2" />
                                                            <span className="text-xs text-slate-400">Clique para alterar</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                                            <span className="text-sm text-slate-500">Arraste ou clique para upload</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "modules" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-slate-800">Módulos & Funcionalidades</h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {Object.entries(formData.modules).map(([key, value]) => (
                                                <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                                    <div>
                                                        <span className="block font-medium text-slate-900 capitalize mb-1">{key}</span>
                                                        <span className="text-xs text-slate-500">Ativar funcionalidade na proposta</span>
                                                    </div>
                                                    <Switch checked={value} onChange={(checked) => handleModuleChange(key, checked)} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "pricing" && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-slate-800">Investimento</h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Setup (R$)</label>
                                                <input
                                                    type="number"
                                                    value={formData.pricing.setup}
                                                    onChange={(e) => handleNestedChange("pricing", "setup", Number(e.target.value))}
                                                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Mensal (R$)</label>
                                                <input
                                                    type="number"
                                                    value={formData.pricing.monthly}
                                                    onChange={(e) => handleNestedChange("pricing", "monthly", Number(e.target.value))}
                                                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Setup com Desconto (Opcional)</label>
                                                <input
                                                    type="number"
                                                    value={formData.pricing.discountedSetup || ""}
                                                    onChange={(e) => handleNestedChange("pricing", "discountedSetup", e.target.value ? Number(e.target.value) : undefined)}
                                                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Ex: 15000"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Mensal com Desconto (Opcional)</label>
                                                <input
                                                    type="number"
                                                    value={formData.pricing.discountedMonthly || ""}
                                                    onChange={(e) => handleNestedChange("pricing", "discountedMonthly", e.target.value ? Number(e.target.value) : undefined)}
                                                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Ex: 1800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                "Salvando..."
                            ) : (
                                <>
                                    <Save className="w-4 h-4" /> Salvar Proposta
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
