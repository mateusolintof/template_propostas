"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProposals } from "../../lib/proposals";
import { Proposal } from "../../types/proposal";
import { Plus, ExternalLink, Edit } from "lucide-react";

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

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Gerador de Propostas</h1>
                    <Link
                        href="/admin/proposals/new"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Nova Proposta
                    </Link>
                </div>

                {loading ? (
                    <div>Carregando propostas...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {proposals.map((proposal) => (
                            <div key={proposal.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{proposal.clientName}</h3>
                                        <p className="text-sm text-slate-500">Slug: {proposal.slug}</p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full" style={{ backgroundColor: proposal.branding.primaryColor }}></div>
                                </div>

                                <div className="flex items-center gap-2 mb-6 text-sm text-slate-600">
                                    <span>{proposal.proposalDate}</span>
                                </div>

                                <div className="flex items-center gap-3 mt-auto">
                                    <Link
                                        href={`/p/${proposal.slug}`}
                                        target="_blank"
                                        className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium"
                                    >
                                        <ExternalLink className="w-4 h-4" /> Visualizar
                                    </Link>
                                    <Link
                                        href={`/admin/proposals/${proposal.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 text-sm font-medium"
                                    >
                                        <Edit className="w-4 h-4" /> Editar
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {proposals.length === 0 && (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                Nenhuma proposta encontrada. Crie a primeira!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
