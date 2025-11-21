Template de Propostas — Guia do Projeto

Visão Geral do Template
- Template para criar propostas interativas (landing de proposta) com conteúdo adaptável por cliente.
- Estrutura modular: seções, modais e fluxos podem ser ativados/ajustados conforme a necessidade.
- Este repositório é uma instância do template já adaptada para o projeto:
  - Proposta: **Dr. Maurício Ernesto — Agentes de IA para Atendimento Comercial**
  - Documento de origem do conteúdo de negócio: `public/docs/arquitetura.md`

Stack
- Next.js 15 (App Router), React 19
- Tailwind v4 com `@theme inline`
- Framer Motion (animações) e Lucide (ícones)
- React Flow (fluxogramas interativos)

Execução
- Requisitos: Node 18+
- Scripts:
  - `npm run dev` — desenvolvimento em http://localhost:3001
  - `npm run build` — build (Turbopack)
  - `npm start` — produção

Arquivos Principais (estrutura técnica)
- `src/app/layout.tsx`
  - Define fontes (Geist + Montserrat), idioma (`pt-BR`) e `metadata` da proposta.
- `src/app/page.tsx`
  - Estrutura da página, seções, navegação por âncoras e mapeamento de modais/fluxos.
  - Campos do cliente atual:
    - `preparedFor = "Dr. Maurício Ernesto"`
    - `proposalDate = "Outubro 2025"`
  - Define o tipo `ModalKind` e qual modal abrir a partir dos CTAs das seções.
- `src/app/components/Modal.tsx`
  - Componente de modal animado (Framer Motion) com:
    - Tamanhos: `size="full"` (fluxos) e `size="md"` (comparativos/briefings).
    - Acessibilidade: `focus-trap`, ESC fecha, clique no overlay fecha, `aria-modal`.
    - Suporte a `titleAlign` e `closeLabel` (ex.: modal de ROI).
- `src/app/components/FlowDiagram.tsx`
  - Definição dos fluxos em React Flow e tipo `FlowKind`:
    - `"agendamento"` — fluxo SDR Qualificador + Agenda Unificada (Tasy + Particular).
    - `"triagem-noshow"` — fluxo Anti No‑Show e fila de espera.
    - `"faq"` — fluxo de FAQ Inteligente (educacional).
  - Função `nodesAndEdges(kind)` retorna `nodes` e `edges` para cada fluxo.
  - Usa `useReducedMotion` para desativar animações quando necessário.
- `src/app/components/modal-content/*`
  - Conteúdos detalhados para cada modal (veja seção “Mapa de Modais” abaixo).
- `src/app/globals.css`
  - Tokens de tema (`--prime-*`), fontes e utilitários globais (`.section`, `.card`, `.btn-primary`, etc.).
  - Estilos dos nós do React Flow (`.flow-node`, `.flow-node--primary`, `.flow-node--decision`, `.flow-node--output`).
- `public/branding/`
  - Logos e ativos da identidade visual do cliente:
    - `logo.svg` — logo atual do Dr. Maurício (usado no nav e no hero).
    - `logo-placeholder.svg` — logo genérica de fallback.
  - README local com instruções rápidas de branding.
- `public/docs/arquitetura.md`
  - Documento de arquitetura de negócio com narrativa completa, gargalos, soluções, KPIs e fluxos textuais.
  - É a principal referência para revisar textos, métricas e argumentos da proposta.

Branding e Tema
- Identificação do cliente (projeto atual):
  - `preparedFor = "Dr. Maurício Ernesto"` e `proposalDate = "Outubro 2025"` em `src/app/page.tsx`.
- Logos:
  - `public/branding/logo.svg` é usado no nav e no hero (`next/image`).
  - Ajuste a referência em `src/app/page.tsx` ao trocar o arquivo (default do template: `branding/logo-placeholder.svg`).
- Cores (definidas em `src/app/globals.css`):
  - `--prime-primary: #041e42` (navy escuro)
  - `--prime-accent: #41b6e6` (azul claro)
  - `--prime-dark: #041e42` (texto em botões e acentos)
- Boas práticas de identidade:
  - Mantenha contraste AA (WCAG) para textos e botões.
  - Prefira SVG para logotipos; otimize PNG/JPG quando necessários.

Conteúdo por Seção (implementação atual)
- Todas as seções abaixo estão implementadas em `src/app/page.tsx`.
- Hero (`id="hero"`)
  - Kicker: “PROPOSTA DE SOLUÇÃO COM IA”.
  - Título: “Agentes de IA para Atendimento Comercial”.
  - Subtítulo: automação ponta a ponta (captação, agendamento, follow-up e inteligência comercial).
  - Badges: `preparedFor` (cliente) e `proposalDate` (data).
  - Logo do cliente ao lado do nav e versão maior no hero (`/branding/logo.svg`).
- Quem Somos (`id="quem-somos"`)
  - Seção “Quem é a Convert.AI?” explicando história, foco em marketing médico e combinação Marketing + IA.
  - Ajustar texto aqui ao replicar o template para outro cliente/segmento.
- Desafio Atual (`id="desafio"`)
  - 4 cartões com dores do contexto do consultório do Dr. Maurício:
    - Alto volume sem qualificação (~150 leads/dia, 1 lead a cada 3,2 min).
    - Agendas desconectadas (Hospital IOP/Tasy vs agenda particular).
    - Zero visibilidade comercial (taxas de conversão desconhecidas).
    - Tempo de resposta e follow-up (leads perdidos, follow-up inexistente).
- Nossas Soluções (`id="solucoes"`)
  - 4 grupos de agentes:
    - SDR Qualificador + Agendamento (WhatsApp).
    - FAQ Inteligente (Educacional).
    - Anti No‑Show + Follow‑Up.
    - CRM + Agenda Unificada + Dashboard.
  - Painel “Soluções Inteligentes” com destaques de CRM, Dashboard, Predição, Insights e Relatórios.
  - Painel “Confiabilidade e Segurança” com fallback humano, LGPD, monitoramento e suporte.
- Fluxos e Ferramentas (`id="fluxos"`)
  - Cartões “AGENTES DE IA” com botão “Ver fluxo”:
    - Agendamento → abre modal `solution` com `kind="agendamento"`.
    - Pré-triagem / No‑show → abre modal `solution` com `kind="triagem-noshow"`.
    - FAQ Inteligente → abre modal `solution` com `kind="faq"`.
  - Cartões de ferramentas:
    - CRM → abre modal `crm`.
    - Dashboard → abre modal `dashboard`.
- Ganhos Esperados (`id="ganhos"`)
  - 4 cartões principais:
    - “O que você conquista” → CTA abre modal `conquistas`.
    - “Inteligência em tempo real” → CTA abre modal `inteligencia`.
    - “Exemplos de insights” → CTA abre modal `insights`.
    - “Relatórios avançados” → CTA abre modal `relatorios`.
  - Métricas e exemplos alinhados ao documento de arquitetura (conversão, no-show, consultas/mês, receita etc.).
- Calculadora de ROI (`id="roi"`)
  - Card com CTA “Calcular ROI” → abre modal `roi`.
  - Usa `RoiModalContent` para simular cenários de faturamento e redução de custos (investimento fixo de R$ 30.000).
- Investimento (`id="investimento"`)
  - Cards de módulos individuais (FAQ Inteligente, SDR Qualificador + Agendamento, Anti No‑Show).
  - Card “Solução Full — Pacote Completo” com descontos e extras.
  - Card adicional com resumo de condições e o modal `valueinfo` comparando “sem visibilidade” vs “com visibilidade total”.
- Plano de Implantação (`id="plano"`)
  - 4 fases: Imersão/Arquitetura; Desenvolvimento dos Agentes; Integrações/Painéis; Go‑Live.
  - Cada fase possui CTA “Ver detalhamento” que abre o modal `phases` com a `phase` correspondente.
- Próximos Passos (`id="cta"`)
  - Três passos: Alinhamento final → Aprovação → Início do Projeto.
  - Sem CTAs de conversão agressiva; foco em proposta consultiva.

Mapa de Modais e Conteúdos
- Todos os modais são controlados em `src/app/page.tsx` via `ModalKind` e renderizados com `Modal` (`src/app/components/Modal.tsx`).
- Fluxos (`type: "solution"`)
  - Mapeados em `src/app/components/FlowDiagram.tsx` com `FlowKind = "agendamento" | "triagem-noshow" | "faq"`.
  - Usados em modais de fluxo com `size="full"`.
- CRM (`type: "crm"`)
  - Conteúdo em `src/app/components/modal-content/CRMModalContent.tsx`.
  - Funis: principal, follow-up e agendados, com colunas e cards simulando leads e valores.
- Dashboard (`type: "dashboard"`)
  - Conteúdo em `src/app/components/modal-content/DashboardModalContent.tsx`.
  - Abas/quadros com KPIs, funil de conversão, exemplos de gráficos e visão de agendamentos.
- Fases do Projeto (`type: "phases"`)
  - Conteúdo em `src/app/components/modal-content/PhaseDetailModalContent.tsx`.
  - Recebe `phase: 1 | 2 | 3 | 4` e detalha objetivos, atividades, integrações, entregáveis, riscos e premissas.
- Valor/Comparativo (`type: "valueinfo"`)
  - Conteúdo inline no próprio `src/app/page.tsx` dentro do modal “Gestão às cegas vs Gestão inteligente”.
  - Comparação entre cenário sem/with visibilidade (KPIs e receita) + disclaimer de números ilustrativos.
- Ganhos / Inteligência / Insights / Relatórios
  - `type: "conquistas"` → `ConquistasModalContent.tsx`: ganhos práticos, tabelas e mini-charts.
  - `type: "inteligencia"` → `InteligenciaModalContent.tsx`: dados em tempo real, alertas, priorização de oportunidades.
  - `type: "insights"` → `InsightsModalContent.tsx`: recomendações acionáveis (horários, canais, funil).
  - `type: "relatorios"` → `RelatoriosModalContentDoc.tsx`: cruzamento de dados marketing/CRM/fechamento, visões executiva e granular.
- Etapas do Atendimento (`type: "etapa"`)
  - Conteúdo em `src/app/components/modal-content/EtapaModalContent.tsx`.
  - Etapas 1–4: Recepção → Agente SDR → Triagem → Atendimento, com descrição de cada momento.
- Calculadora de ROI (`type: "roi"`)
  - Conteúdo em `src/app/components/modal-content/RoiModalContent.tsx`.
  - Simulações para aumento de faturamento e redução de quadro (ROI em 12 meses).

Fluxos (React Flow) — Como editar/criar
- Arquivo: `src/app/components/FlowDiagram.tsx`.
- Para adicionar novo fluxo:
  - Atualize `export type FlowKind` para incluir o novo identificador.
  - Adicione um novo case em `nodesAndEdges(kind)` retornando `nodes` e `edges`.
  - Em `src/app/page.tsx`:
    - Adicione um card na seção “AGENTES DE IA” (seção Fluxos) mapeando para o novo `FlowKind`.
    - Configure o botão “Ver fluxo” para abrir `{ type: "solution", kind: <novoKind>, title: "<Título do fluxo>" }`.
- Boas práticas:
  - 6–12 nós por diagrama; títulos curtos; cores consistentes com o tema (use classes `.flow-node*`).
  - Use `fitViewOptions` para garantir enquadramento e mantenha `MiniMap`, `Controls` e `Background`.
  - Evite poluição visual; priorize legibilidade e narrativa de negócio.

Estilo e Convenções
- Linguagem: Português (pt‑BR), tom consultivo e direto.
- Código:
  - TypeScript; nomes descritivos; evitar variáveis de uma letra.
  - Evitar comentários supérfluos; priorizar código legível.
- CSS:
  - Priorizar tokens do tema definidos em `src/app/globals.css` em vez de cores hardcoded.
  - Utilizar utilitários do Tailwind v4 (`@theme inline`) para cores, tipografia e espaçamentos.
- Ícones:
  - Lucide com tamanho 16–20 px nos cards e títulos.
  - Ícones usados no projeto atual incluem: `CalendarCheck2`, `BellRing`, `MessageSquare`, `Stethoscope`, `KanbanSquare`, `BarChart3`, `Trophy`, `Brain`, `Lightbulb`, `FileBarChart`, `UserRound`, `Sparkles`, `PanelsTopLeft`, `CheckCircle2`.

Acessibilidade
- Fornecer `alt` descritivo para logos/imagens (ex.: `alt={\`Logo ${preparedFor}\`}`).
- Garantir contraste mínimo AA para texto/botões.
- Respeitar `prefers-reduced-motion`:
  - Modal e FlowDiagram já usam `useReducedMotion` para reduzir animações.
  - Ao adicionar novas animações, seguir o mesmo padrão.

Desempenho
- Prefira SVG para logos e ícones; otimize PNG/JPG.
- Evite imagens pesadas no hero; reutilize assets em `public/branding/`.
- React Flow é carregado via `dynamic import` sem SSR — manter essa abordagem para novos fluxos.

Repositório (Local)
- Este template começa sem remoto. Quando necessário, crie o remoto e configure `origin`.
- Commits: mensagens curtas e descritivas (ex.: `feat:`, `chore:`, `fix:`).

Checklist de Entrega (status deste projeto)
- [x] Atualizar `preparedFor` e `proposalDate` em `src/app/page.tsx`.
- [x] Substituir `public/branding/logo-placeholder.svg` pela logo do cliente.
- [x] Ajustar `--prime-*` em `src/app/globals.css` conforme a identidade do cliente.
- [x] Revisar textos de seções e modais para o contexto do cliente (base: `public/docs/arquitetura.md`).
- [x] Validar contraste e responsividade (mobile/desktop).
- [x] Conferir métricas/valores e adicionar disclaimer quando necessário (ex.: modais de valor/ROI).
