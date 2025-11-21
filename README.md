Proposta — Dr. Maurício Ernesto • Agentes de IA para Atendimento Comercial

Este repositório é uma instância do template de propostas interativas da Convert.AI, adaptado para o projeto do **Dr. Maurício Ernesto** com foco em **Agentes de IA para Atendimento Comercial** (SDR, FAQ, Anti No‑Show, CRM + Agenda Unificada + Dashboard).

Stack
- Next.js 15 (App Router) + React 19
- Tailwind v4 com `@theme inline`
- Framer Motion (animações)
- Lucide (ícones)
- React Flow (fluxogramas interativos)

Principais Recursos da Proposta
- Página contínua com sensação de slides (seções bem marcadas, navegação por âncoras).
- Modais animados com overlay/blur, ESC para fechar, clique no overlay e `focus-trap`.
- Fluxogramas interativos em React Flow com grid, minimapa e controles.
- Mini‑charts e painéis para ROI, funil de leads e ganhos esperados.
- Conteúdo de negócio baseado no documento `public/docs/arquitetura.md`.

Como Rodar (porta 3001)
- Requisitos: Node 18+
- Instalação: `npm install`
- Desenvolvimento: `npm run dev` → http://localhost:3001
- Build: `npm run build`
- Produção: `npm start`

Mapa de Arquivos Importantes
- `src/app/layout.tsx`
  - Define fontes (Geist + Montserrat), idioma (`pt-BR`) e metadados da proposta.
- `src/app/page.tsx`
  - Estrutura completa da página (nav + seções + rodapé).
  - Controle de modais via tipo `ModalKind`.
  - Campos específicos do cliente:
    - `preparedFor = "Dr. Maurício Ernesto"`
    - `proposalDate = "Outubro 2025"`
- `src/app/components/Modal.tsx`
  - Componente de modal reutilizável:
    - `size="full"` (fluxos) e `size="md"` (comparativos/briefings).
    - Acessibilidade: ESC, clique no overlay, `focus-trap`, `aria-modal`.
- `src/app/components/FlowDiagram.tsx`
  - Fluxos em React Flow representando os agentes de IA:
    - `FlowKind = "agendamento" | "triagem-noshow" | "faq"`.
    - `agendamento`: SDR + Agenda Unificada (Tasy + Particular).
    - `triagem-noshow`: lembretes, confirmações, reagendamentos e fila de espera.
    - `faq`: FAQ Inteligente com tópicos de procedimentos, recuperação, valores/convênios, sobre o médico, localização e horários.
- `src/app/components/modal-content/*`
  - Conteúdos específicos de cada modal (ver seção seguinte).
- `src/app/globals.css`
  - Tokens de tema (`--prime-*`), fontes e utilitários globais (`.section`, `.card`, `.btn-primary`, `.badge` etc.).
  - Estilos dos nós de fluxos (`.flow-node`, `.flow-node--primary`, `.flow-node--decision`, `.flow-node--output`).
- `public/branding/logo.svg`
  - Logo do Dr. Maurício (SVG usado no nav e no hero).
- `public/docs/arquitetura.md`
  - Documento de arquitetura de negócio original da proposta (gargalos, soluções, métricas, fluxos, investimentos).

Mapa de Seções (page.tsx)
- Nav / Header
  - Logo do cliente (`/branding/logo.svg`) e navegação por âncoras:
    - `#quem-somos`, `#desafio`, `#solucoes`, `#fluxos`, `#plano`, `#ganhos`, `#investimento`, `#cta`.
- Hero (`id="hero"`)
  - Kicker: “PROPOSTA DE SOLUÇÃO COM IA”.
  - Título: “Agentes de IA para Atendimento Comercial”.
  - Subtítulo: automação ponta a ponta (captação, agendamento, confirmação, follow‑up, inteligência comercial).
  - Badges com `preparedFor` e `proposalDate`.
  - Logo em destaque ao lado (imagem grande).
- Quem Somos (`id="quem-somos"`)
  - Seção “Quem é a Convert.AI?” explicando histórico, foco em clínicas médicas e combinação Marketing + IA.
- Desafio Atual (`id="desafio"`)
  - Baseado no documento de arquitetura:
    - ~150 leads/dia, agendas desconectadas (Tasy + particular), zero visibilidade comercial, follow‑up inexistente.
  - 4 cartões com dores principais (volume sem qualificação, agendas desconectadas, visibilidade, tempo de resposta/follow‑up).
- Nossas Soluções (`id="solucoes"`)
  - 4 blocos principais:
    - SDR Qualificador + Agendamento (WhatsApp).
    - FAQ Inteligente (Educacional).
    - Anti No‑Show + Follow‑Up.
    - CRM + Agenda Unificada + Dashboard.
  - Painel “Soluções Inteligentes”: CRM, Dashboard, Análise preditiva, Insights, Relatórios.
  - Painel “Confiabilidade e Segurança”: fallback humano, LGPD, monitoramento, suporte.
- Fluxos e Ferramentas (`id="fluxos"`)
  - Cartões de agentes (cada um com botão “Ver fluxo”):
    - Fluxo de Agendamento (`kind="agendamento"`).
    - Fluxo de Pré‑triagem / No‑show (`kind="triagem-noshow"`).
    - Fluxo de FAQ Inteligente (`kind="faq"`).
  - Cartões de ferramentas:
    - CRM → abre modal `crm`.
    - Dashboard → abre modal `dashboard`.
- Ganhos Esperados (`id="ganhos"`)
  - 4 cartões:
    - O que você conquista → modal `conquistas`.
    - Inteligência em tempo real → modal `inteligencia`.
    - Exemplos de insights → modal `insights`.
    - Relatórios avançados → modal `relatorios`.
  - Números ilustrativos alinhados ao documento (ex.: conversão 15%→39%, no‑show 25%→10%, 1.750 consultas/mês, receita estimada).
- Calculadora de ROI (`id="roi"`)
  - Card “Calculadora de ROI” com CTA abrindo modal `roi`.
  - Simula ROI por aumento de faturamento e por redução de quadro (investimento base R$ 30.000).
- Investimento (`id="investimento"`)
  - Cards para:
    - FAQ Inteligente.
    - SDR Qualificador + Agendamento (destaque).
    - Anti No‑Show.
    - Solução Full — Pacote Completo (com descontos e extras).
  - Card explicativo e modal `valueinfo` (“Gestão às cegas vs Gestão inteligente”) com comparação de KPIs e receita.
- Plano de Implantação (`id="plano"`)
  - 4 fases:
    - Fase 1 — Imersão/Arquitetura.
    - Fase 2 — Desenvolvimento dos Agentes.
    - Fase 3 — Integrações/Painéis.
    - Fase 4 — Testes e Go‑Live.
  - Cada fase abre modal `phases` com mais detalhes.
- Próximos Passos (`id="cta"`)
  - Três passos: Alinhamento final → Aprovação → Início do Projeto.
  - Não há CTAs de venda agressiva; foco em decisão consultiva.

Mapa de Modais e Componentes (modal-content)
- Todos os modais são controlados via estado `modal` em `src/app/page.tsx` e renderizados com `Modal`.
- `CRMModalContent.tsx` (modal `crm`)
  - Funis: principal, follow‑up e agendados.
  - Colunas com estágios (Novo, Qualificado, Agendado, Confirmado etc.) e cards simulando pacientes, valores e origem do lead.
- `DashboardModalContent.tsx` (modal `dashboard`)
  - Painéis com KPIs, funis e visão de agendamentos.
  - Números ilustrativos com nota para ajustar quando houver dados reais.
- `PhaseDetailModalContent.tsx` (modal `phases`)
  - Detalhamento de cada fase do projeto:
    - Objetivos, atividades, integrações, entregáveis, riscos e premissas.
- `ConquistasModalContent.tsx` (modal `conquistas`)
  - Detalha ganhos práticos (redução de no‑show, aumento de conversão, aumento de consultas/mês, receita).
- `InteligenciaModalContent.tsx` (modal `inteligencia`)
  - Mostra visão de inteligência em tempo real: KPIs, alertas, priorização de oportunidades.
- `InsightsModalContent.tsx` (modal `insights`)
  - Exemplos de insights acionáveis (horários, canais, funil, gargalos).
- `RelatoriosModalContentDoc.tsx` (modal `relatorios`)
  - Relatórios com cruzamento de dados de marketing, CRM e fechamento, visão executiva e granular.
- `EtapaModalContent.tsx` (modal `etapa`)
  - Etapas da jornada:
    - 1: Recepção.
    - 2: Agente SDR.
    - 3: Triagem.
    - 4: Atendimento.
  - Cada etapa com descrição textual de responsabilidades e interações.
- `RoiModalContent.tsx` (modal `roi`)
  - Calculadora de ROI com dois blocos:
    - ROI por aumento de faturamento (leads/mês, taxa de conversão atual/nova, ticket médio).
    - ROI por redução de custos (FTEs, salário, FTEs liberados).
  - Exibe aumento/economia mensal e anual, além de ROI em 12 meses.

Fluxos (React Flow)
- Definidos em `src/app/components/FlowDiagram.tsx`.
- Usa:
  - `useNodesState` e `useEdgesState` para controlar estado.
  - `addEdge` em `onConnect` para permitir criação de novas conexões.
  - `MiniMap`, `Controls` e `Background` para navegação.
- Para adicionar ou ajustar um fluxo:
  - Editar `FlowKind` e o `switch` da função `nodesAndEdges(kind)`.
  - Ajustar seções em `page.tsx` que chamam `FlowDiagramLazy`.

Identidade Visual
- Cores definidas em `src/app/globals.css`:
  - `--prime-primary: #041e42`
  - `--prime-accent: #41b6e6`
  - `--prime-dark: #041e42`
- Classes utilitárias:
  - `.section`, `.section-title`, `.subtitle`, `.card`, `.badge`, `.btn-primary`, `.hero-kicker`.
- Logo:
  - `public/branding/logo.svg` (SVG oficial incluído localmente).

Ícones
- Ícones Lucide utilizados (principais):
  - `CalendarCheck2`, `BellRing`, `MessageSquare`, `Stethoscope`, `KanbanSquare`, `BarChart3`, `Trophy`, `Brain`, `Lightbulb`, `FileBarChart`, `UserRound`, `Sparkles`, `PanelsTopLeft`, `CheckCircle2`.

Para adaptar este projeto para outro cliente, consulte também o arquivo `AGENTS.md`, que traz o guia do template, checklist de entrega e melhores práticas de conteúdo e branding.
