"use client";

import type { ReactNode } from "react";

type Etapa = 1 | 2 | 3 | 4;

type EtapaConfig = {
  title: string;
  intro: string;
  bullets?: string[];
  cards?: { title: string; bullets: string[] }[];
  omnichannel?: { title: string; description: string };
  footer?: string;
};

const etapaData: Record<Etapa, EtapaConfig> = {
  1: {
    title: "Etapa 1 - Recepção",
    intro: "Primeiro contato do paciente. O agente responde imediatamente, com tom humano e acolhedor.",
    bullets: [
      "Detecta se é primeira vez ou retorno",
      "Identifica urgência na mensagem",
      "Cria rapport com linguagem simples",
    ],
    omnichannel: {
      title: "Canais omnichannel",
      description: "Site, WhatsApp, Instagram, formulários e demais canais configurados convergem para uma fila única.",
    },
  },
  2: {
    title: "Etapa 2 — Agente SDR",
    intro: "Qualificação inteligente com perguntas contextuais e sem menus engessados.",
    bullets: [
      "Identifica a necessidade (consulta ou exame)",
      "Coleta: convênio ou particular",
      "Adapta perguntas conforme respostas",
      "Evita perguntas desnecessárias",
    ],
  },
  3: {
    title: "Etapa 3 — Triagem",
    intro: "Encaminhamento para o subfunil correto com coleta mínima de dados.",
    cards: [
      {
        title: "Convênio",
        bullets: [
          "Nome do convênio",
          "Número da carteirinha e validade",
          "Especialista desejado",
        ],
      },
      {
        title: "Particular",
        bullets: [
          "Nome completo, CPF e telefone",
          "Especialista desejado",
        ],
      },
    ],
    footer: "Valida dados em tempo real e prepara o agendamento.",
  },
  4: {
    title: "Etapa 4 — Atendimento",
    intro: "Agendamento inteligente com consulta de agenda em tempo real.",
    bullets: [
      "Apresenta opções formatadas (data/horário)",
      "Confirma a escolha e registra no sistema",
      "Dispara confirmação e orientações",
      "Automatiza lembretes e follow-up (reduz no-show)",
    ],
  },
};

export function getEtapaTitle(etapa: Etapa): string {
  const titles: Record<Etapa, string> = {
    1: "Recepção",
    2: "Agente SDR",
    3: "Triagem",
    4: "Atendimento",
  };
  return titles[etapa];
}

export default function EtapaModalContent({ etapa }: { etapa: Etapa }) {
  const data = etapaData[etapa];

  const renderList = (items?: string[]): ReactNode => (
    <ul className="space-y-2 text-slate-700 list-disc list-inside pl-1">
      {items?.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">{data.intro}</p>

        {etapa === 1 && (
          <>
            {renderList(data.bullets)}
            {data.omnichannel && (
              <div className="bg-prime-accent/5 rounded-lg border border-prime-accent/20 p-4 mt-6">
                <h4 className="font-bold text-prime mb-2">{data.omnichannel.title}</h4>
                <p className="text-slate-700 text-sm">{data.omnichannel.description}</p>
              </div>
            )}
          </>
        )}

        {etapa === 2 && renderList(data.bullets)}

        {etapa === 3 && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {data.cards?.map((card) => (
                <div key={card.title} className="bg-white rounded-lg border border-slate-200 p-4">
                  <h4 className="font-bold text-prime mb-3">{card.title}</h4>
                  {renderList(card.bullets)}
                </div>
              ))}
            </div>
            {data.footer && (
              <p className="text-slate-700 text-sm mt-4">{data.footer}</p>
            )}
          </>
        )}

        {etapa === 4 && renderList(data.bullets)}
      </div>
    </div>
  );
}
