"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../../lib/firebase";
import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Proposal, defaultProposal } from "../../types/proposal";

interface ProposalFormProps {
    initialData?: Proposal;
    isEditing?: boolean;
}

export default function ProposalForm({ initialData, isEditing = false }: ProposalFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Proposal>(initialData || defaultProposal);
    const [logoFile, setLogoFile] = useState<File | null>(null);

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
            alert("Modo Demo: As alterações não serão salvas no banco de dados.");
            router.push("/admin");
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

            router.push("/admin");
        } catch (error) {
            console.error("Error saving proposal:", error);
            alert("Erro ao salvar proposta.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
            {/* Basic Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nome do Cliente</label>
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Slug (URL)</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Data da Proposta</label>
                        <input
                            type="text"
                            name="proposalDate"
                            value={formData.proposalDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                        />
                    </div>
                </div>
            </div>

            {/* Branding */}
            <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-slate-900">Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Cor Primária</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={formData.branding.primaryColor}
                                onChange={(e) => handleNestedChange("branding", "primaryColor", e.target.value)}
                                className="h-10 w-10 rounded border p-1"
                            />
                            <input
                                type="text"
                                value={formData.branding.primaryColor}
                                onChange={(e) => handleNestedChange("branding", "primaryColor", e.target.value)}
                                className="block w-full rounded-md border-slate-300 shadow-sm p-2 border text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Cor Accent</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={formData.branding.accentColor}
                                onChange={(e) => handleNestedChange("branding", "accentColor", e.target.value)}
                                className="h-10 w-10 rounded border p-1"
                            />
                            <input
                                type="text"
                                value={formData.branding.accentColor}
                                onChange={(e) => handleNestedChange("branding", "accentColor", e.target.value)}
                                className="block w-full rounded-md border-slate-300 shadow-sm p-2 border text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Cor Dark (Fundo Hero)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={formData.branding.darkColor}
                                onChange={(e) => handleNestedChange("branding", "darkColor", e.target.value)}
                                className="h-10 w-10 rounded border p-1"
                            />
                            <input
                                type="text"
                                value={formData.branding.darkColor}
                                onChange={(e) => handleNestedChange("branding", "darkColor", e.target.value)}
                                className="block w-full rounded-md border-slate-300 shadow-sm p-2 border text-sm"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {formData.branding.logoUrl && (
                        <p className="mt-2 text-xs text-slate-500">Logo atual: {formData.branding.logoUrl}</p>
                    )}
                </div>
            </div>

            {/* Modules */}
            <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-slate-900">Módulos Ativos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(formData.modules).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`module-${key}`}
                                checked={value}
                                onChange={(e) => handleModuleChange(key, e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`module-${key}`} className="ml-2 block text-sm text-slate-900 capitalize">
                                {key}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-slate-900">Precificação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Setup (R$)</label>
                        <input
                            type="number"
                            value={formData.pricing.setup}
                            onChange={(e) => handleNestedChange("pricing", "setup", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Mensal (R$)</label>
                        <input
                            type="number"
                            value={formData.pricing.monthly}
                            onChange={(e) => handleNestedChange("pricing", "monthly", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Setup com Desconto (Opcional)</label>
                        <input
                            type="number"
                            value={formData.pricing.discountedSetup || ""}
                            onChange={(e) => handleNestedChange("pricing", "discountedSetup", e.target.value ? Number(e.target.value) : undefined)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Mensal com Desconto (Opcional)</label>
                        <input
                            type="number"
                            value={formData.pricing.discountedMonthly || ""}
                            onChange={(e) => handleNestedChange("pricing", "discountedMonthly", e.target.value ? Number(e.target.value) : undefined)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? "Salvando..." : "Salvar Proposta"}
                </button>
            </div>
        </form>
    );
}
