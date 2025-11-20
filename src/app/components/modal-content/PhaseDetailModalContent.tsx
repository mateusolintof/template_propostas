"use client";

export default function PhaseDetailModalContent({ phase }: { phase: 1 | 2 | 3 | 4 }) {
  const phaseData = {
    1: {
      title: "Fase 1: Imersão e Arquitetura",
      items: [
        { title: "Workshop de Imersão", description: "Mapeamento de processos atuais, objeções reais dos pacientes e definição de stakeholders." },
        { title: "Desenho de Fluxos Conversacionais", description: "Fluxograma completo de cada agente (SDR, FAQ, No‑Show) e árvore de decisões." },
        { title: "Arquitetura Técnica de Agentes", description: "Definição da stack, integrações, segurança/LGPD e diagrama de arquitetura." },
        { title: "Prototipagem e Validação", description: "Mockups de conversas-chave e ajustes com base no feedback da equipe." }
      ]
    },
    2: {
      title: "Fase 2: Desenvolvimento dos Agentes",
      items: [
        { title: "Agente Orquestrador + SDR", description: "Qualificação automatizada (particular/convênio), validação de convênios e proposta de horários." },
        { title: "Agente FAQ Educacional", description: "Base de conhecimento (procedimentos, recuperação, valores/convênios, sobre o médico, localização)." },
        { title: "Agente Anti No‑Show", description: "Confirmações D‑2/D‑1/D‑2h, reagendamento e fila de espera." },
        { title: "Teste Guiado (Human‑in‑the‑loop)", description: "Validação ponta a ponta com escala para humano quando necessário." }
      ]
    },
    3: {
      title: "Fase 3: Integrações e Painéis",
      items: [
        { title: "Agenda Unificada", description: "Integração Hospital IOP (Tasy) + agenda particular; prevenção de conflitos e sobreposições." },
        { title: "CRM Comercial", description: "Funis, estágios, tags por especialidade/origem e histórico completo de conversas." },
        { title: "Dashboard Executivo", description: "KPIs, funil completo, previsões de no‑show e relatórios executivos." },
        { title: "Relatórios", description: "Mês atual, pipeline, crescimento vs mês anterior." }
      ]
    },
    4: {
      title: "Fase 4: Go‑Live e Estabilização",
      items: [
        { title: "Go‑Live", description: "Deploy em produção com checklist final, backup e plano de rollback." },
        { title: "Monitoramento 24/7", description: "Acompanhamento de conversas, correção de fluxos e melhoria contínua." },
        { title: "Otimização de Conversões", description: "Ajustes de prompts e respostas FAQ com base em métricas reais." },
        { title: "Treinamento e Handover", description: "Documentação final, playbook e treinamento avançado da equipe." }
      ]
    }
  };

  const data = phaseData[phase];

  return (
    <div className="p-4 md:p-6 space-y-4">
      {data.items.map((item, idx) => (
        <div key={idx} className="bg-slate-50 p-5 rounded-lg border border-slate-200">
          <h4 className="font-bold text-lg text-prime-dark mb-2">{item.title}</h4>
          <p className="text-slate-700 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

// Componentes dos modais da seção Ganhos
