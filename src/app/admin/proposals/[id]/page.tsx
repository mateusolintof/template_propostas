"use client";

import { use, useState, useEffect } from "react";
import ProposalForm from "../../../../components/admin/ProposalForm";
import { getProposalById } from "../../../../lib/proposals";
import { Proposal } from "../../../../types/proposal";

export default function EditProposalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getProposalById(id);
            setProposal(data);
            setLoading(false);
        }
        load();
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (!proposal) return <div>Proposta não encontrada.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Editar Proposta: {proposal.clientName}</h1>
            <ProposalForm initialData={proposal} isEditing />
        </div>
    );
}
