import ProposalForm from "../../../../components/admin/ProposalForm";

export default function NewProposalPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Nova Proposta</h1>
            <ProposalForm />
        </div>
    );
}
