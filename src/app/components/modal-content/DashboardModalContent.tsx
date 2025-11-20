"use client";

import { useState } from "react";

export default function DashboardModalContent() {
  const [tab, setTab] = useState<"overview" | "funil" | "agendamentos" | "insights">("overview");

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Navigation Tabs */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { k: "overview", t: "Visão Geral" },
            { k: "funil", t: "Funil" },
            { k: "agendamentos", t: "Agendamentos" },
            { k: "insights", t: "Insights" },
          ].map((i) => (
            <button
              key={i.k}
              onClick={() => setTab(i.k as "overview" | "funil" | "agendamentos" | "insights")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                tab === i.k
                  ? "bg-prime text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {i.t}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Leads/dia", value: "150", change: "+24%", type: "positive" },
                { label: "Conversão", value: "39%", change: "+160%", type: "positive" },
                { label: "No-show", value: "10%", change: "-60%", type: "positive" },
                { label: "Consultas/mês", value: "1.750", change: "+42%", type: "positive" },
                { label: "Receita", value: "R$ 700k", change: "+42%", type: "positive" },
                { label: "Pipeline", value: "R$ 1,305M", change: "novo", type: "positive" },
                { label: "Qualificação", value: "60%", change: "estável", type: "positive" },
                { label: "Show Rate", value: "90%", change: "+7%", type: "positive" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                  <div className={`mt-1 text-sm font-semibold ${kpi.type === 'positive' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {kpi.change} vs mês anterior
                  </div>
                </div>
              ))}
            </div>

            {/* Distribuições principais */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Distribuição: Particular vs Convênio</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Particular</div>
                      <div className="text-slate-600">58% • 2.610</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime-accent" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Convênio</div>
                      <div className="text-slate-600">42% • 1.890</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime" style={{ width: "42%" }} />
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">Base: 4.500 leads/mês (estimativa)</div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Procedimentos Mais Procurados</h3>
                <div className="space-y-3">
                  {[
                    { nome: "Artroscopia", pct: 38, leads: 1710 },
                    { nome: "Tratamento Artrose", pct: 32, leads: 1440 },
                    { nome: "Artroplastia", pct: 18, leads: 810 },
                    { nome: "Células-Tronco", pct: 12, leads: 540 },
                  ].map((p) => (
                    <div key={p.nome}>
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-semibold text-slate-700">{p.nome}</div>
                        <div className="text-slate-600">{p.pct}% • {p.leads}</div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-prime" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500">Números ilustrativos extraídos do documento de arquitetura. Ajustar com dados reais do período.</div>
          </div>
        )}

        {/* Aba "canais" removida nesta proposta */}

        {tab === "funil" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Leads/mês", value: "4.500" },
                { label: "Qualificados", value: "60%" },
                { label: "Agendados", value: "~2.100" },
                { label: "Confirmados", value: "~1.940" },
                { label: "Realizados", value: "1.750" },
                { label: "No-show", value: "10%" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold text-prime">{kpi.value}</div>
                </div>
              ))}
            </div>

            {/* Funil Visual */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Funil de Conversão Completo</h3>
              <div className="space-y-4">
                {[
                  { etapa: "Leads", valor: 4500, percentual: 100, cor: "bg-blue-600" },
                  { etapa: "Qualificados", valor: 2700, percentual: 60, cor: "bg-indigo-600" },
                  { etapa: "Agendados", valor: 2100, percentual: 46.7, cor: "bg-violet-600" },
                  { etapa: "Confirmados", valor: 1940, percentual: 43.1, cor: "bg-purple-600" },
                  { etapa: "Realizados", valor: 1750, percentual: 38.9, cor: "bg-fuchsia-600" },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium text-slate-700">{item.etapa}</div>
                      <div className="flex-1">
                        <div className="h-10 bg-slate-100 rounded-lg overflow-hidden relative">
                          <div
                            className={`h-full ${item.cor} transition-all duration-500 flex items-center justify-between px-4`}
                            style={{ width: `${item.percentual}%` }}
                          >
                            <span className="text-white font-bold text-sm">{item.valor.toLocaleString()}</span>
                            <span className="text-white font-bold text-sm">{item.percentual.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="ml-32 pl-4 mt-1 text-xs text-slate-500">
                        ↓ Perda: {((1 - item.percentual / 100) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "agendamentos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Realizados (mês)", value: "1.750", status: "positive" },
                { label: "No-show", value: "10%", status: "positive" },
                { label: "Show Rate", value: "90%", status: "positive" },
                { label: "Pipeline", value: "R$ 1,305M", status: "positive" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</div>
                </div>
              ))}
            </div>

            {/* Distribuição Particular/Convênio e Top Convênios */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Particular vs Convênio</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Particular</div>
                      <div className="text-slate-600">58% • 2.610</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime-accent" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-700">Convênio</div>
                      <div className="text-slate-600">42% • 1.890</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-prime" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-sm font-semibold text-slate-800 mb-2">Top 3 Convênios</div>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>1. Unimed — 820 leads</li>
                    <li>2. Bradesco — 567 leads</li>
                    <li>3. Servir — 378 leads</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Procedimentos Mais Procurados</h3>
                <div className="space-y-3">
                  {[
                    { nome: "Artroscopia", pct: 38, leads: 1710 },
                    { nome: "Tratamento Artrose", pct: 32, leads: 1440 },
                    { nome: "Artroplastia", pct: 18, leads: 810 },
                    { nome: "Células-Tronco", pct: 12, leads: 540 },
                  ].map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-slate-900">{p.nome}</div>
                        <div className="text-sm text-slate-600">{p.leads} leads</div>
                      </div>
                      <div className="w-28">
                        <div className="h-2 bg-slate-200 rounded">
                          <div className="h-2 bg-prime rounded" style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                      <div className="font-bold text-slate-700">{p.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500">Números ilustrativos do documento de arquitetura; ajustar quando integrar aos dados reais.</div>
          </div>
        )}

        {tab === "insights" && (
          <div className="space-y-6">
            {/* Alert Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h4 className="font-bold text-orange-900 text-lg mb-2">Atenção: Oportunidade Crítica</h4>
                  <p className="text-slate-700 mb-3">Ortopedia tem 47 pacientes em fila de espera e 12 horários vagos na próxima semana. Potencial de <span className="font-bold text-orange-700">+R$ 5.640</span> em receita.</p>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                    Disparar Campanha Agora
                  </button>
                </div>
              </div>
            </div>

            {/* Insights Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">📊</div>
                  <h4 className="font-bold text-slate-900">Padrão de Conversão</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  35% dos leads chegam no domingo com conversão de apenas 28% (vs 48% na segunda-feira). Causa: demora na resposta.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                  <div className="font-semibold text-emerald-900 text-sm">💡 Ação Sugerida:</div>
                  <p className="text-sm text-emerald-800 mt-1">Ativar bot com senso de urgência nos fins de semana</p>
                  <div className="text-emerald-700 font-bold mt-2">Ganho potencial: +R$ 25.200/mês</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">💎</div>
                  <h4 className="font-bold text-slate-900">Objeção Principal</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  79% dos leads de cirurgia que não convertem mencionam &quot;preço alto&quot;. Taxa de conversão: apenas 22%.
                </p>
                <div className="bg-sky-50 border border-sky-200 p-3 rounded-lg">
                  <div className="font-semibold text-sky-900 text-sm">💡 Ação Sugerida:</div>
                  <p className="text-sm text-sky-800 mt-1">Oferecer parcelamento 6x antes da objeção</p>
                  <div className="text-sky-700 font-bold mt-2">Ganho potencial: +R$ 18.000/mês</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">🎯</div>
                  <h4 className="font-bold text-slate-900">Melhor Canal</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Indicações têm 94% de conversão, 4% de no-show e LTV de R$ 3.980 (melhor canal). Atualmente: apenas 13% dos leads.
                </p>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                  <div className="font-semibold text-purple-900 text-sm">💡 Ação Sugerida:</div>
                  <p className="text-sm text-purple-800 mt-1">Criar programa de indicação com R$ 200 de incentivo</p>
                  <div className="text-purple-700 font-bold mt-2">Meta: Dobrar indicações = +R$ 196k/mês</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">✅</div>
                  <h4 className="font-bold text-slate-900">Tendência Positiva</h4>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Lesões do Joelho aumentaram conversão em 18% (35% → 53%). Motivo: resposta mais rápida no WhatsApp.
                </p>
                <div className="bg-teal-50 border border-teal-200 p-3 rounded-lg">
                  <div className="font-semibold text-teal-900 text-sm">💡 Ação Sugerida:</div>
                  <p className="text-sm text-teal-800 mt-1">Replicar estratégia em outras especialidades</p>
                  <div className="text-teal-700 font-bold mt-2">Continue fazendo!</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para os detalhes das fases
