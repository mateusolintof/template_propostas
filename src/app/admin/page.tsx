"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProposals } from "../../lib/proposals";
import { Proposal } from "../../types/proposal";
import { Plus, ExternalLink, Edit, FileText, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getAllProposals();
            setProposals(data);
            setLoading(false);
        }
        load();
    }, []);

    const stats = [
        { label: "Propostas Criadas", value: proposals.length, icon: FileText, color: "bg-blue-500" },
        { label: "Taxa de Conversão", value: "N/A", icon: TrendingUp, color: "bg-emerald-500" },
        { label: "Clientes Ativos", value: proposals.length, icon: Users, color: "bg-purple-500" },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <div className="bg-[#041e42] text-white pt-12 pb-24 px-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gerador de Propostas</h1>
                        <p className="text-slate-400 mt-2">Gerencie suas propostas comerciais em um só lugar.</p>
                    </div>
                    <Link
                        href="/admin/proposals/new"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50 font-medium"
                    >
                        <Plus className="w-5 h-5" /> Nova Proposta
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 -mt-16">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-800">{loading ? "-" : stat.value}</div>
                                <div className="text-sm text-slate-500">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Proposals Grid */}
                <h2 className="text-xl font-bold text-slate-800 mb-6">Propostas Recentes</h2>

                {loading ? (
                    <div className="flex items-center justify-center py-20 text-slate-500">Carregando propostas...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {proposals.map((proposal, i) => (
                            <motion.div
                                key={proposal.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="h-2 w-full" style={{ backgroundColor: proposal.branding.primaryColor }}></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{proposal.clientName}</h3>
                                            <p className="text-xs text-slate-400 font-mono mt-1">/p/{proposal.slug}</p>
                                        </div>
                                        {proposal.branding.logoUrl && (
                                            <img src={proposal.branding.logoUrl} alt="Logo" className="h-8 w-auto object-contain opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                                        )}
                                    </div>

                                    <div className="mt-auto pt-6 flex items-center gap-3">
                                        <Link
                                            href={`/p/${proposal.slug}`}
                                            target="_blank"
                                            className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 py-2.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 text-sm font-medium transition-all"
                                        >
                                            <ExternalLink className="w-4 h-4" /> Visualizar
                                        </Link>
                                        <Link
                                            href={`/admin/proposals/${proposal.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 shadow-md shadow-slate-200 hover:shadow-lg text-sm font-medium transition-all"
                                        >
                                            <Edit className="w-4 h-4" /> Editar
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {proposals.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                                <p className="text-slate-500 mb-4">Nenhuma proposta encontrada.</p>
                                <Link
                                    href="/admin/proposals/new"
                                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                                >
                                    <Plus className="w-4 h-4" /> Criar a primeira
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
