"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  CalendarCheck2,
  BellRing,
  MessageSquare,
  Stethoscope,
  KanbanSquare,
  BarChart3,
  Trophy,
  Brain,
  Lightbulb,
  FileBarChart,
  UserRound,
  Sparkles,
  PanelsTopLeft,
  CheckCircle2,
} from "lucide-react";
import Modal from "./components/Modal";
import { type FlowKind } from "./components/FlowDiagram";

// Atualize estes campos para cada nova proposta
const preparedFor = "Dr. Maurício Ernesto";
const proposalDate = "Outubro 2025";

const FlowDiagramLazy = dynamic<{ kind: FlowKind }>(
  () => import("./components/FlowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Carregando fluxo...
      </div>
    ),
  }
);

const ModalContentFallback = () => (
  <div className="flex h-full items-center justify-center p-6 text-sm text-slate-500">
    Carregando conteúdo...
  </div>
);

const RoiModalLazy = dynamic<{ preparedFor: string }>(
  () => import("./components/modal-content/RoiModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const CRMModalLazy = dynamic(
  () => import("./components/modal-content/CRMModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const DashboardModalLazy = dynamic(
  () => import("./components/modal-content/DashboardModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const PhaseDetailModalLazy = dynamic<{ phase: 1 | 2 | 3 | 4 }>(
  () => import("./components/modal-content/PhaseDetailModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const ConquistasModalLazy = dynamic(
  () => import("./components/modal-content/ConquistasModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const InteligenciaModalLazy = dynamic(
  () => import("./components/modal-content/InteligenciaModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const InsightsModalLazy = dynamic(
  () => import("./components/modal-content/InsightsModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const RelatoriosModalLazy = dynamic(
  () => import("./components/modal-content/RelatoriosModalContentDoc"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const EtapaModalLazy = dynamic<{ etapa: 1 | 2 | 3 | 4 }>(
  () => import("./components/modal-content/EtapaModalContent"),
  { ssr: false, loading: () => <ModalContentFallback /> }
);

const etapaTitles: Record<1 | 2 | 3 | 4, string> = {
  1: "Recepção",
  2: "Agente SDR",
  3: "Triagem",
  4: "Atendimento",
};

const getEtapaTitle = (etapa: 1 | 2 | 3 | 4) => etapaTitles[etapa];

type ModalKind =
  | { type: "solution"; kind: FlowKind; title: string }
  | { type: "crm" }
  | { type: "dashboard" }
  | { type: "phases"; phase: 1 | 2 | 3 | 4 }
  | { type: "valueinfo" }
  | { type: "conquistas" }
  | { type: "inteligencia" }
  | { type: "insights" }
  | { type: "relatorios" }
  | { type: "etapa"; etapa: 1 | 2 | 3 | 4 }
  | { type: "roi" }
  | null;

export default function Home() {
  const [modal, setModal] = useState<ModalKind>(null);

  // soluções listadas diretamente nas seções (sem uso aqui)

  return (
    <div className="min-h-screen">
      {/* Top nav for smooth anchors */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/branding/logo.svg" alt={`Logo ${preparedFor}`} width={120} height={40} />
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-prime" href="#quem-somos">Quem Somos</a>
            <a className="hover:text-prime" href="#desafio">Desafio</a>
            <a className="hover:text-prime" href="#solucoes">Soluções</a>
            <a className="hover:text-prime" href="#fluxos">Fluxos</a>
            <a className="hover:text-prime" href="#plano">Plano</a>
            <a className="hover:text-prime" href="#ganhos">Ganhos</a>
            <a className="hover:text-prime" href="#investimento">Investimento</a>
            <a className="hover:text-prime" href="#cta">Próximos passos</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="section bg-gradient-to-b from-white to-slate-50" id="hero">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="hero-kicker">PROPOSTA DE SOLUÇÃO COM IA</span>
            <h1 className="mt-3 text-5xl md:text-7xl font-bold text-prime leading-tight">
              Agentes de IA para Atendimento Comercial
            </h1>
            <p className="subtitle mt-4">
              Automação ponta a ponta para captação, agendamento, confirmação, follow-up e
              inteligência comercial.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="badge">Preparado para: {preparedFor}</span>
              <span className="badge">Data: {proposalDate}</span>
            </div>
            {/* Botões removidos conforme ajustes */}
          </div>
          <div className="flex justify-center">
            <Image src="/branding/logo.svg" width={420} height={150} alt={`Logo ${preparedFor}`} className="drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* QUEM SOMOS NÓS */}
      <section className="section bg-white" id="quem-somos">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">
            Quem é a <span className="text-prime-accent">Convert.AI</span>?
          </h2>
          <div className="mt-4 h-1 w-20 bg-prime-accent rounded-full"></div>
          
          <div className="mt-10 card">
            <h3 className="text-xl md:text-2xl font-bold text-prime mb-6">Nossa História</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-slate-700 leading-relaxed">
                <p>
                  Somos uma <span className="font-semibold text-prime-accent">agência especializada em tráfego pago</span> para{" "}
                  <span className="font-semibold text-prime-accent">clínicas médicas</span> há mais de 6 anos, com expertise comprovada em performance e crescimento no setor de saúde.
                </p>
              </div>
              
              <div className="text-slate-700 leading-relaxed">
                <p>
                  Durante nossa jornada, identificamos que um <span className="font-semibold text-prime-accent">atendimento deficitário</span> impactava drasticamente as{" "}
                  <span className="font-semibold text-prime-accent">conversões finais</span>, mesmo com campanhas de alta performance. Com o advento dos{" "}
                  <span className="font-semibold text-prime-accent">Agentes de IA</span>, unimos expertise em marketing médico com tecnologia de IA, criando soluções específicas para nossos clientes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 card bg-gradient-to-r from-prime-accent/10 to-prime/5 border-prime-accent/30">
            <p className="text-center text-lg md:text-xl font-semibold text-slate-800">
              <span className="text-prime-accent">Expertise em Marketing</span> +{" "}
              <span className="text-prime-accent">Tecnologia de IA</span> ={" "}
              <span className="text-prime-accent">Resultados</span>
            </p>
          </div>
        </div>
      </section>

      {/* (Plano de Implantação movido para após Ganhos) */}

      {/* DESAFIO ATUAL */}
      <section className="section" id="desafio">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Desafio Atual</h2>
          <p className="subtitle mt-2">Contexto do consultório do {preparedFor}: alto volume de leads, agendas desconectadas e baixa visibilidade comercial.</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-prime">Alto volume sem qualificação</h3>
              <ul className="mt-3 space-y-1 text-slate-700">
                <li>~150 leads/dia; 1 lead a cada 3,2 min</li>
                <li>Qualificação básica consome 80% do tempo</li>
                <li>Falta priorização por urgência/aderência</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-prime">Agendas desconectadas</h3>
              <ul className="mt-3 space-y-1 text-slate-700">
                <li>Hospital IOP (Tasy) vs agenda particular</li>
                <li>Conflitos e sobreposições</li>
                <li>Dificuldade de encaixes e remarcações</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-prime">Zero visibilidade comercial</h3>
              <ul className="mt-3 space-y-1 text-slate-700">
                <li>Não mede taxa de qualificação/conversão</li>
                <li>Gargalos desconhecidos no funil</li>
                <li>Sem previsão de no-show</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-prime">Tempo de resposta e follow-up</h3>
              <ul className="mt-3 space-y-1 text-slate-700">
                <li>Leads fora do horário se perdem</li>
                <li>Falta follow-up estruturado</li>
                <li>Leads qualificados esfriam sem ação</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES (valor) */}
      <section className="section bg-slate-50" id="solucoes">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Nossas Soluções</h2>
          <p className="subtitle mt-2">Soluções integradas para qualificar, agendar, reduzir no‑show e dar visibilidade total (CRM + Agenda Unificada + Dashboard).</p>

          <div className="mt-8">
            <div className="card">
              <div className="font-bold text-prime">4 soluções para o consultório do {preparedFor}</div>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="font-semibold text-prime flex items-center gap-2"><CalendarCheck2 className="h-5 w-5"/> SDR Qualificador + Agendamento (WhatsApp)</div>
                <ul className="mt-2 text-slate-700 space-y-1">
                  <li>Atendimento 24/7 com resposta imediata</li>
                  <li>Qualificação automática (particular × convênio)</li>
                  <li>Validação de convênios e proposta de horários</li>
                </ul>
              </div>
              <div className="card">
                <div className="font-semibold text-prime flex items-center gap-2"><MessageSquare className="h-5 w-5"/> FAQ Inteligente (Educacional)</div>
                <ul className="mt-2 text-slate-700 space-y-1">
                  <li>Procedimentos, recuperação e valores/convênios</li>
                  <li>Sobre o médico, localização e horários</li>
                  <li>Convida a agendar ao final (conversão)</li>
                </ul>
              </div>
              <div className="card">
                <div className="font-semibold text-prime flex items-center gap-2"><BellRing className="h-5 w-5"/> Anti No‑Show + Follow‑Up</div>
                <ul className="mt-2 text-slate-700 space-y-1">
                  <li>Lembretes D‑2, D‑1 e D‑2h + confirmação</li>
                  <li>Reagendamento automático e fila de espera</li>
                  <li>Follow‑up pós‑consulta (NPS, retornos, exames)</li>
                </ul>
              </div>
              <div className="card">
                <div className="font-semibold text-prime flex items-center gap-2"><Stethoscope className="h-5 w-5"/> CRM + Agenda Unificada + Dashboard</div>
                <ul className="mt-2 text-slate-700 space-y-1">
                  <li>Unifica Hospital IOP (Tasy) + particular</li>
                  <li>Funis, tags e histórico completo no CRM</li>
                  <li>KPIs, funil e relatórios executivos</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="font-semibold text-prime">SOLUÇÕES INTELIGENTES</div>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>✅ Dashboard em tempo real</li>
                <li>✅ CRM com histórico completo</li>
                <li>✅ Análise preditiva (prevê problemas)</li>
                <li>✅ Insights completos com oportunidades</li>
                <li>✅ Cruzamento de dados entre Marketing Orgânico, Pago, CRM e Fechamento</li>
                <li>✅ Relatórios executivos</li>
              </ul>
              <div className="mt-4 text-slate-600">Gestão baseada em dados, não em achismo.</div>
              <button className="mt-4 btn-primary" onClick={() => setModal({ type: "valueinfo" })}>Ver mais</button>
            </div>
            <div className="card">
              <div className="font-semibold text-prime">CONFIABILIDADE E SEGURANÇA</div>
              <ul className="mt-3 space-y-4 text-slate-700">
                <li>Fallback: humanos assumem quando necessário.</li>
                <li>Monitoramento (alertas em tempo real, playbook e reprocessamento).</li>
                <li>Privacidade &amp; LGPD</li>
                <li>Segurança dos dados de ponta a ponta</li>
                <li>Suporte (com SLA pré-definido).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FLUXO E FERRAMENTAS */}
      <section className="section" id="fluxos">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Fluxo e Ferramentas Inteligentes</h2>
          <p className="subtitle mt-2">Fluxograma dos agentes e exemplos das ferramentas</p>
          <h3 className="mt-8 font-bold text-prime">AGENTES DE IA</h3>

          {/* Quadro de Etapas (layout atualizado) */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100/60">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {[
                {
                  etapa: 1,
                  title: "Recepção",
                  description: "Paciente envia mensagem",
                  icon: <UserRound className="h-5 w-5" />,
                },
                {
                  etapa: 2,
                  title: "Agente SDR",
                  description: "Identifica a necessidade",
                  icon: <Sparkles className="h-5 w-5" />,
                },
                {
                  etapa: 3,
                  title: "Triagem",
                  description: "Encaminha para subfunil",
                  icon: <PanelsTopLeft className="h-5 w-5" />,
                },
                {
                  etapa: 4,
                  title: "Atendimento",
                  description: "Resolve ou agenda",
                  icon: <CheckCircle2 className="h-5 w-5" />,
                },
              ].map((item) => (
                <div key={item.etapa} className="p-6 lg:p-8 flex flex-col items-start text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-prime-accent/15 border border-prime-accent/30 text-prime flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-prime">Etapa {item.etapa}</span>
                  </div>
                  <h4 className="mt-3 text-xl font-extrabold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-slate-600 text-sm">{item.description}</p>
                  <button
                    onClick={() => setModal({ type: "etapa", etapa: item.etapa as 1 | 2 | 3 | 4 })}
                    className="mt-4 text-sm font-semibold text-prime underline decoration-2 underline-offset-4 hover:text-prime-accent"
                  >
                    Ver mais
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-6">
            {[
              { key: "agendamento" as FlowKind, title: "SDR Qualificador + Agendamento" },
              { key: "faq" as FlowKind, title: "FAQ Inteligente (Educacional)" },
              { key: "triagem-noshow" as FlowKind, title: "Anti No‑Show + Follow‑Up" },
            ].map((s) => (
              <div key={s.key} className="card flex flex-col justify-between">
                <div className="font-semibold text-prime">{s.title}</div>
                <button className="mt-4 btn-primary" onClick={() => setModal({ type: "solution", kind: s.key, title: s.title })}>Ver fluxo</button>
              </div>
            ))}
          </div>

          <h3 className="mt-10 font-bold text-prime">FERRAMENTAS</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="card flex flex-col justify-between">
              <div>
                <div className="font-semibold text-prime flex items-center gap-2"><KanbanSquare className="h-5 w-5"/> CRM Comercial</div>
                <div className="mt-2 text-slate-700 text-sm">Funis com estágios, histórico de conversas, tags por procedimento e origem do lead</div>
              </div>
              <button className="mt-4 btn-primary" onClick={() => setModal({ type: "crm" })}>Ver exemplo</button>
            </div>
            <div className="card flex flex-col justify-between">
              <div>
                <div className="font-semibold text-prime flex items-center gap-2"><BarChart3 className="h-5 w-5"/> Dashboard</div>
                <div className="mt-2 text-slate-700 text-sm">Visão geral, funil completo e agendamentos com KPIs e previsões de no‑show</div>
              </div>
              <button className="mt-4 btn-primary" onClick={() => setModal({ type: "dashboard" })}>Ver exemplo</button>
            </div>
          </div>
        </div>
      </section>

      {/* PLANO DE IMPLANTAÇÃO */}
      <section className="section bg-slate-50" id="plano">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Plano de Implantação</h2>
          <p className="subtitle mt-2">Do mapeamento à implementação: 4 fases estruturadas</p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { phase: 1, title: "Imersão e Arquitetura", icon: "🔍" },
          { phase: 2, title: "Desenvolvimento dos Agentes", icon: "⚙️" },
          { phase: 3, title: "Integrações e Painéis", icon: "🔗" },
          { phase: 4, title: "Testes e Go-Live", icon: "🚀" },
        ].map((item) => (
          <button
            key={item.phase}
            type="button"
            className="card hover:shadow-md transition-shadow text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prime"
            onClick={() => setModal({ type: "phases", phase: item.phase as 1 | 2 | 3 | 4 })}
          >
            <div className="text-2xl md:text-3xl mb-2" aria-hidden>
              {item.icon}
            </div>
            <div className="text-base md:text-lg font-semibold text-prime mb-1">FASE {item.phase}</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
            <div className="text-prime text-sm font-semibold group-hover:underline">Ver detalhes →</div>
          </button>
        ))}
      </div>
      <div className="mt-4 text-base text-slate-600">As estimativas podem ser alteradas de acordo com a complexidades dos fluxos demandados pelo cliente</div>
        </div>
      </section>

      {/* GANHOS (quatro cartões) */}
      <section className="section" id="ganhos">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Ganhos Esperados</h2>
          <p className="subtitle mt-2">Resultados concretos e mensuráveis para {preparedFor}</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Cartão 1: O que você conquista */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="text-xl md:text-2xl font-bold text-prime mb-2 flex items-center gap-2"><Trophy className="h-5 w-5 text-prime"/> O que você conquista</div>
              <div className="text-slate-700 space-y-2 mb-4">
                <div>🕘 Atendimento 24/7 no WhatsApp — sem perda de leads fora do horário</div>
                <div>🤖 Qualificação e FAQ automatizados — recepção foca no que importa</div>
                <div>📅 Agenda unificada (IOP Tasy + particular) — menos conflitos e encaixes rápidos</div>
                <div>🔔 Confirmações e reagendamentos automáticos — redução de faltas e ocupação melhor</div>
                <div>🔄 Follow‑up estruturado — retornos/exames e acompanhamento pós‑procedimento</div>
              </div>
              <button className="btn-primary" onClick={() => setModal({ type: "conquistas" })}>Ver todos os ganhos →</button>
            </div>

            {/* Cartão 2: Inteligência em tempo real */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="text-xl md:text-2xl font-bold text-prime mb-2 flex items-center gap-2"><Brain className="h-5 w-5 text-prime"/> Inteligência em tempo real</div>
              <div className="text-slate-700 space-y-2 mb-4">
                <div>📊 Taxa de conversão de leads</div>
                <div>🎯 Especialidades mais procuradas</div>
                <div>⚠️ Previsão de no-show</div>
              </div>
              <button className="btn-primary" onClick={() => setModal({ type: "inteligencia" })}>Ver análises completas →</button>
            </div>

            {/* Cartão 3: Exemplos de insights */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="text-xl md:text-2xl font-bold text-prime mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-prime"/> Exemplos de insights</div>
              <div className="text-slate-700 text-sm space-y-2 mb-4">
                <div>💡 &quot;35% dos leads chegam no domingo, mas conversão 20% menor → Bot responde na hora&quot;</div>
                <div>💡 &quot;18 orçamentos de cirurgia, só 4 fecharam por preço → Criar parcelamento 6x&quot;</div>
              </div>
              <button className="btn-primary" onClick={() => setModal({ type: "insights" })}>Ver mais insights →</button>
            </div>

            {/* Cartão 4: Relatórios avançados */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="text-xl md:text-2xl font-bold text-prime mb-2 flex items-center gap-2"><FileBarChart className="h-5 w-5 text-prime"/> Relatórios avançados</div>
              <div className="text-slate-700 space-y-2 mb-4">
                <div>🔗 Cruzamento multicanal completo</div>
                <div>🎯 Clusterização de pacientes por perfil</div>
                <div>📊 Jornada do paciente ponta a ponta</div>
              </div>
              <button className="btn-primary" onClick={() => setModal({ type: "relatorios" })}>Ver relatórios →</button>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA DE ROI */}
      <section className="section bg-gradient-to-r from-white via-slate-50 to-emerald-50" id="roi">
        <div className="mx-auto max-w-6xl px-4">
          <div className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 bg-white/90 backdrop-blur">
            <div>
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Simule o impacto financeiro</div>
              <h3 className="text-2xl md:text-3xl font-bold text-prime mt-1">Calculadora de ROI</h3>
              <p className="text-slate-600 mt-2 max-w-2xl text-sm md:text-base">
                Compare ganhos por aumento de faturamento ou redução de custos de equipe, considerando um investimento fixo de R$ 30.000 para implementação completa.
              </p>
            </div>
            <button className="btn-primary w-full md:w-auto px-6 py-3 text-base" onClick={() => setModal({ type: "roi" })}>
              Calcular ROI
            </button>
          </div>
        </div>
      </section>

      {/* INVESTIMENTO - adaptado ao documento de arquitetura */}
      <section className="section" id="investimento">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Investimento</h2>
          <p className="subtitle mt-2">Soluções Modulares ou Pacote Completo</p>

          {/* Linha superior (modelo1): 3 cards com destaque no centro */}
          <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
            {/* Esquerda - FAQ Inteligente */}
            <div className="card flex flex-col">
              <div className="text-prime font-bold">FAQ Inteligente</div>
              <div className="mt-3 text-slate-800 space-y-2">
                <div>
                  <div className="text-slate-600 text-sm">Investimento Único (Setup + Dev)</div>
                  <div className="text-xl font-bold">R$ 10.000,00</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm">Mensalidade</div>
                  <div className="text-lg font-semibold">R$ 800,00/mês</div>
                </div>
                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                  <li>Agente FAQ especialista</li>
                  <li>Base de conhecimento completa</li>
                  <li>Integração com WhatsApp</li>
                  <li>Métricas de conversão FAQ→Lead</li>
                </ul>
              </div>
              <div className="mt-6 h-px bg-slate-200" />
            </div>

            {/* Centro - destaque (SDR Qualificador + Agendamento) */}
            <div className="card flex flex-col ring-2 ring-prime shadow-lg md:-mt-3">
              <div className="text-prime font-extrabold">SDR Qualificador + Agendamento</div>
              <div className="mt-3 text-slate-800 space-y-2">
                <div>
                  <div className="text-slate-600 text-sm">Investimento Único (Setup + Dev)</div>
                  <div className="text-2xl font-extrabold">R$ 20.000,00</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm">Mensalidade</div>
                  <div className="text-xl font-bold">R$ 2.200,00/mês</div>
                </div>
                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                  <li>Agente Orquestrador + SDR (Particular/Convênio)</li>
                  <li>Validação de convênios</li>
                  <li>Integração Omnichannel + CRM</li>
                  <li>Dashboard essencial</li>
                </ul>
              </div>
              <div className="mt-6 h-px bg-slate-200" />
            </div>

            {/* Direita - Anti No‑Show */}
            <div className="card flex flex-col">
              <div className="text-prime font-bold">Anti No‑Show</div>
              <div className="mt-3 text-slate-800 space-y-2">
                <div>
                  <div className="text-slate-600 text-sm">Investimento Único (Setup + Dev)</div>
                  <div className="text-xl font-bold">R$ 10.000,00</div>
                </div>
                <div>
                  <div className="text-slate-600 text-sm">Mensalidade</div>
                  <div className="text-lg font-semibold">R$ 1.000,00/mês</div>
                </div>
                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                  <li>Confirmações D‑2/D‑1/D‑2h</li>
                  <li>Reagendamento inteligente + fila de espera</li>
                  <li>Follow‑up pós‑consulta</li>
                  <li>Integração com CRM + métricas de no‑show</li>
                </ul>
              </div>
              <div className="mt-6 h-px bg-slate-200" />
            </div>
          </div>

          {/* Linha inferior (modelo2): 2 cards */}
          <div className="mt-8 grid md:grid-cols-2 gap-6 items-stretch">
            {/* Solução completa (Full) */}
            <div className="card flex flex-col">
              <div className="text-prime font-bold">Solução Full — Pacote Completo</div>
              <div className="mt-3 text-slate-800 space-y-2">
                <div className="text-slate-600 text-sm">Investimento Único</div>
                <div className="text-2xl font-extrabold">De R$ 40.000 → R$ 25.000</div>
                <div className="text-slate-600 text-sm">Mensalidade</div>
                <div className="text-lg font-semibold">De R$ 4.000/mês → R$ 2.500/mês</div>
                <div className="text-slate-700 text-sm mt-2">Inclui: SDR + FAQ + No‑Show + CRM + Agenda Unificada + Dashboard</div>
                <div className="mt-3 text-sm text-slate-700">
                  <div className="font-semibold text-slate-800">Extras</div>
                  <ul className="mt-2 space-y-1">
                    <li>Treinamento (8h) e suporte 60 dias</li>
                    <li>Acompanhamento mensal (3 meses)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 h-px bg-slate-200" />
            </div>

            {/* Condições de Pagamento */}
            <div className="card flex flex-col">
              <div className="text-prime font-bold">Condições de Pagamento</div>
              <div className="mt-3 text-slate-800 space-y-3">
                <div className="text-sm">
                  <div className="font-semibold text-slate-800">Investimento Único</div>
                  <ul className="mt-1 space-y-1 text-slate-700">
                    <li>À vista (5% de desconto)</li>
                    <li>5 parcelas de R$ 5.000</li>
                    <li>3x sem juros (cartão corporativo)</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-800">Mensalidade</div>
                  <ul className="mt-1 space-y-1 text-slate-700">
                    <li>Inicia no mês seguinte ao go‑live</li>
                    <li>Faturamento via boleto ou PIX</li>
                  </ul>
                </div>
                <div className="text-xs text-slate-600">Incluso: Infraestrutura, suporte (SLA 24h úteis), manutenção, segurança, backup e monitoramento 24/7.</div>
              </div>
              <div className="mt-6 h-px bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-50" id="cta">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">Próximos Passos</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "Alinhamento Final", desc: "Refinamento dos requisitos e expectativas" },
              { title: "Aprovação da Proposta", desc: "Formalização do acordo e início do projeto" },
              { title: "Início do Projeto", desc: "Kick-off e primeiros desenvolvimentos" },
            ].map((s) => (
              <div key={s.title} className="card">
                <h3 className="text-lg font-semibold text-prime">{s.title}</h3>
                <p className="mt-2 text-slate-700">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs removidos */}

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-sm text-slate-500">
        Convert.AI | Soluções em Automações de IA
      </footer>

      {/* MODALS */}
      <Modal
        open={modal?.type === "solution"}
        onClose={() => setModal(null)}
        title={(modal && modal.type === "solution" && modal.title) || "Fluxo"}
        scrollContent={false}
      >
        <div className="h-full">
          {modal && modal.type === "solution" ? (
            <FlowDiagramLazy kind={modal.kind} />
          ) : null}
        </div>
      </Modal>

      {/* Modal "Gestão às cegas vs Gestão inteligente" (médio) */}
      <Modal open={modal?.type === "valueinfo"} onClose={() => setModal(null)} title="Gestão às cegas vs Gestão inteligente" size="md">
        <div className="p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-slate-200 p-4 bg-white">
              <div className="font-bold text-rose-600">SEM VISIBILIDADE</div>
              <div className="mt-3 text-slate-700 text-sm">Antes de implementar a solução</div>
              <ul className="mt-3 space-y-1 text-slate-700 text-sm">
                <li>Conversão: 15%</li>
                <li>No‑show: 25%</li>
                <li>Consultas/mês: 675</li>
                <li>Leads perdidos: ~2.250/mês</li>
                <li>Receita mensal: R$ 270.000</li>
              </ul>
              <div className="mt-3 text-slate-800 text-sm">Decisões: no achismo, reativas, pouca previsibilidade</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 bg-white">
              <div className="font-bold text-emerald-600">COM VISIBILIDADE TOTAL</div>
              <div className="mt-3 text-slate-700 text-sm">Depois de implantar IA + CRM + Dashboard</div>
              <ul className="mt-3 space-y-1 text-slate-700 text-sm">
                <li>Conversão: 39% (+160%)</li>
                <li>No‑show: 10% (−60%)</li>
                <li>Consultas/mês: 1.750 (+1.075)</li>
                <li>Leads perdidos: ~810/mês (−64%)</li>
                <li>Receita mensal: R$ 700.000 (+R$ 430.000)</li>
              </ul>
              <div className="mt-3 text-slate-800 text-sm">Decisões: baseadas em dados, proativas, com previsibilidade</div>
            </div>
          </div>
          <div className="mt-4 text-center text-slate-600 text-xs">Números ilustrativos do documento de arquitetura (ajustar conforme dados reais do período).</div>
        </div>
      </Modal>

      <Modal
        open={modal?.type === "roi"}
        onClose={() => setModal(null)}
        title="Calculadora de ROI"
        titleAlign="center"
        closeLabel="Voltar"
      >
        <RoiModalLazy preparedFor={preparedFor} />
      </Modal>

      <Modal open={modal?.type === "crm"} onClose={() => setModal(null)} title="CRM Comercial">
        <CRMModalLazy />
      </Modal>

      <Modal open={modal?.type === "dashboard"} onClose={() => setModal(null)} title="Dashboard">
        <DashboardModalLazy />
      </Modal>

      {/* Modal Fases do Projeto */}
      <Modal
        open={modal?.type === "phases"}
        onClose={() => setModal(null)}
        title={modal?.type === "phases" ? `Fase ${modal.phase}: Detalhamento` : "Fases do Projeto"}
        size="md"
      >
        <PhaseDetailModalLazy phase={modal?.type === "phases" ? modal.phase : 1} />
      </Modal>

      {/* Modais da Seção Ganhos */}
      <Modal open={modal?.type === "conquistas"} onClose={() => setModal(null)} title="O Que Você Conquista">
        <ConquistasModalLazy />
      </Modal>

      <Modal open={modal?.type === "inteligencia"} onClose={() => setModal(null)} title="Inteligência em Tempo Real">
        <InteligenciaModalLazy />
      </Modal>

      <Modal open={modal?.type === "insights"} onClose={() => setModal(null)} title="Exemplos de Insights Acionáveis">
        <InsightsModalLazy />
      </Modal>

      <Modal open={modal?.type === "relatorios"} onClose={() => setModal(null)} title="Relatórios Avançados com Cruzamento de Dados">
        <RelatoriosModalLazy />
      </Modal>

      {/* Modais das Etapas */}
      <Modal
        open={modal?.type === "etapa"}
        onClose={() => setModal(null)}
        title={modal?.type === "etapa" ? `Etapa ${modal.etapa} - ${getEtapaTitle(modal.etapa)}` : "Etapa"}
        size="md"
      >
        <EtapaModalLazy etapa={modal?.type === "etapa" ? modal.etapa : 1} />
      </Modal>
    </div>
  );
}
