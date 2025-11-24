export interface Proposal {
    id?: string;
    slug: string;
    clientName: string;
    proposalDate: string;
    branding: {
        primaryColor: string;
        accentColor: string;
        darkColor: string;
        logoUrl: string;
    };
    pricing: {
        setup: number;
        monthly: number;
        discountedSetup?: number;
        discountedMonthly?: number;
    };
    modules: {
        sdr: boolean;
        faq: boolean;
        noShow: boolean;
        crm: boolean;
    };
    createdAt: Date | string; // Firestore timestamp or ISO string
    updatedAt: Date | string;
}

export const defaultProposal: Proposal = {
    slug: "exemplo",
    clientName: "Cliente Exemplo",
    proposalDate: "Novembro 2025",
    branding: {
        primaryColor: "#041e42",
        accentColor: "#41b6e6",
        darkColor: "#041e42",
        logoUrl: "/branding/logo.svg",
    },
    pricing: {
        setup: 20000,
        monthly: 2200,
    },
    modules: {
        sdr: true,
        faq: true,
        noShow: true,
        crm: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};
