"use client";

import { useState } from "react";

export default function CRMModalContent() {
  const [funil, setFunil] = useState<"principal" | "followup" | "agendados">("principal");
  type Lead = { id: number; nome: string; especialidade: string; valor: number; origem?: string; tempo?: string; horario?: string; status?: string };

  const pacientes = {
    principal: {
      novo: [
        { id: 1, nome: "Maria Silva", especialidade: "Lesão LCA", valor: 450, origem: "WhatsApp", tempo: "2h" },
        { id: 2, nome: "João Santos", especialidade: "Dor no Joelho", valor: 380, origem: "Instagram", tempo: "5h" },
        { id: 3, nome: "Ana Costa", especialidade: "Menisco", valor: 320, origem: "Google", tempo: "1d" },
      ],
      qualificado: [
        { id: 4, nome: "Pedro Oliveira", especialidade: "Artroplastia", valor: 3500, origem: "Indicação", tempo: "3h" },
        { id: 5, nome: "Carla Mendes", especialidade: "Artrose", valor: 850, origem: "WhatsApp", tempo: "1d" },
        { id: 6, nome: "Lucas Ferreira", especialidade: "Células‑Tronco", valor: 420, origem: "Facebook", tempo: "2d" },
      ],
      agendado: [
        { id: 7, nome: "Beatriz Lima", especialidade: "Artroscopia", valor: 520, origem: "Instagram", tempo: "4h" },
        { id: 8, nome: "Rafael Costa", especialidade: "Lesão LCA", valor: 680, origem: "WhatsApp", tempo: "1d" },
      ],
      confirmado: [
        { id: 9, nome: "Julia Alves", especialidade: "Meniscectomia", valor: 390, origem: "Indicação", tempo: "6h" },
        { id: 10, nome: "Marcos Rocha", especialidade: "Reconstrução LCA", valor: 2800, origem: "Google", tempo: "2d" },
      ],
    },
    followup: {
      aguardando: [
        { id: 11, nome: "Fernanda Silva", especialidade: "Artrose", valor: 750, origem: "WhatsApp", tempo: "3d" },
        { id: 12, nome: "Roberto Lima", especialidade: "Dor no Joelho", valor: 480, origem: "Instagram", tempo: "5d" },
      ],
      contatado: [
        { id: 13, nome: "Camila Santos", especialidade: "Lesão Meniscal", valor: 420, origem: "Facebook", tempo: "1d" },
        { id: 14, nome: "Diego Costa", especialidade: "Ruptura LCA", valor: 350, origem: "Google", tempo: "2d" },
      ],
      reengajado: [
        { id: 15, nome: "Patricia Mendes", especialidade: "Artroplastia", valor: 3200, origem: "Indicação", tempo: "4d" },
      ],
      perdido: [
        { id: 16, nome: "Gustavo Alves", especialidade: "Dor no Joelho", valor: 680, origem: "WhatsApp", tempo: "15d" },
      ],
    },
    agendados: {
      hoje: [
        { id: 17, nome: "Amanda Rocha", especialidade: "Condromalácia", valor: 390, horario: "09:00", status: "Confirmado" },
        { id: 18, nome: "Felipe Santos", especialidade: "Lesão LCA", valor: 520, horario: "10:30", status: "Confirmado" },
        { id: 19, nome: "Isabela Costa", especialidade: "Artrose", valor: 450, horario: "14:00", status: "Pendente" },
      ],
      amanha: [
        { id: 20, nome: "Thiago Lima", especialidade: "Artroplastia", valor: 2900, horario: "08:00", status: "Confirmado" },
        { id: 21, nome: "Larissa Mendes", especialidade: "Menisco", valor: 420, horario: "11:00", status: "Confirmado" },
      ],
      semana: [
        { id: 22, nome: "Bruno Oliveira", especialidade: "Revisão Pós‑op", valor: 680, horario: "Qua 15:00", status: "Confirmado" },
        { id: 23, nome: "Natalia Silva", especialidade: "Condromalácia", valor: 350, horario: "Qui 09:30", status: "Pendente" },
        { id: 24, nome: "Eduardo Costa", especialidade: "Dor no Joelho", valor: 480, horario: "Sex 16:00", status: "Confirmado" },
      ],
      reagendar: [
        { id: 25, nome: "Vanessa Santos", especialidade: "Artrose", valor: 420, horario: "Cancelado", status: "Reagendar" },
      ],
    },
  };

  const colunas = {
    principal: [
      { key: "novo", label: "Novo", count: pacientes.principal.novo.length, color: "bg-sky-500" },
      { key: "qualificado", label: "Qualificado", count: pacientes.principal.qualificado.length, color: "bg-indigo-500" },
      { key: "agendado", label: "Agendado", count: pacientes.principal.agendado.length, color: "bg-emerald-500" },
      { key: "confirmado", label: "Confirmado", count: pacientes.principal.confirmado.length, color: "bg-violet-500" },
    ],
    followup: [
      { key: "aguardando", label: "Aguardando Follow-up", count: pacientes.followup.aguardando.length, color: "bg-amber-500" },
      { key: "contatado", label: "Contatado", count: pacientes.followup.contatado.length, color: "bg-blue-500" },
      { key: "reengajado", label: "Reengajado", count: pacientes.followup.reengajado.length, color: "bg-emerald-500" },
      { key: "perdido", label: "Perdido", count: pacientes.followup.perdido.length, color: "bg-red-500" },
    ],
    agendados: [
      { key: "hoje", label: "Hoje", count: pacientes.agendados.hoje.length, color: "bg-emerald-500" },
      { key: "amanha", label: "Amanhã", count: pacientes.agendados.amanha.length, color: "bg-blue-500" },
      { key: "semana", label: "Esta Semana", count: pacientes.agendados.semana.length, color: "bg-indigo-500" },
      { key: "reagendar", label: "Reagendar", count: pacientes.agendados.reagendar.length, color: "bg-orange-500" },
    ],
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <aside className="w-56 border-r border-slate-200 bg-slate-50 p-4">
        <div className="font-bold text-slate-900 mb-4 text-lg">Funis</div>
        <div className="space-y-2">
          {[
            { key: "principal", label: "Funil Principal", icon: "🎯" },
            { key: "followup", label: "Follow-up", icon: "🔄" },
            { key: "agendados", label: "Agendados", icon: "📅" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFunil(item.key as "principal" | "followup" | "agendados")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                funil === item.key
                  ? "bg-prime text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 space-y-3">
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-xs font-medium text-slate-600 uppercase">Total Leads</div>
            <div className="text-2xl font-bold text-prime mt-1">142</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-xs font-medium text-slate-600 uppercase">Taxa Conversão</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">67,7%</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-xs font-medium text-slate-600 uppercase">Ticket Médio</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">R$ 768</div>
          </div>
        </div>
      </aside>

      {/* Kanban Area */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 min-w-max">
          {colunas[funil].map((coluna) => {
            const leadsDaColuna: Lead[] = (pacientes as Record<string, Record<string, Lead[]>>)[funil][
              coluna.key
            ] ?? [];
            return (
              <div key={coluna.key} className="w-80 flex-shrink-0">
                {/* Header da Coluna */}
                <div className={`${coluna.color} text-white rounded-t-lg px-4 py-3 flex items-center justify-between`}>
                  <span className="font-bold">{coluna.label}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm font-semibold">{coluna.count}</span>
                </div>

                {/* Cards */}
                <div className="bg-slate-50 border-x border-b border-slate-200 rounded-b-lg p-3 space-y-3 min-h-[400px]">
                  {leadsDaColuna.map((lead: {id: number; nome: string; especialidade: string; valor: number; origem?: string; tempo?: string; horario?: string; status?: string}) => (
                    <div key={lead.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                      {/* Nome e Valor */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-slate-900">{lead.nome}</div>
                        <div className="text-sm font-bold text-emerald-600">R$ {lead.valor}</div>
                      </div>

                      {/* Especialidade */}
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700 mb-2">
                        🏥 {lead.especialidade}
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                        {lead.origem && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded">
                            📱 {lead.origem}
                          </span>
                        )}
                        {lead.tempo && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded">
                            ⏱️ {lead.tempo}
                          </span>
                        )}
                        {lead.horario && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded">
                            🕐 {lead.horario}
                          </span>
                        )}
                        {lead.status && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold ${
                            lead.status === "Confirmado" ? "bg-emerald-100 text-emerald-700" :
                            lead.status === "Pendente" ? "bg-amber-100 text-amber-700" :
                            "bg-orange-100 text-orange-700"
                          }`}>
                            {lead.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Button */}
                  <button className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-prime hover:text-prime transition-colors font-medium text-sm">
                    + Adicionar Lead
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Dashboard modal content renovado (estilo ilp-oficial)
