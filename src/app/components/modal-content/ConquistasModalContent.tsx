"use client";

export default function ConquistasModalContent() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-emerald-900 mb-4">Ganhos Operacionais</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-emerald-700 mb-2">🕘 Atendimento 24/7</div>
            <div className="text-sm text-slate-700">Leads fora do horário recebem resposta imediata e são encaminhados</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-emerald-700 mb-2">🤖 Automação de tarefas</div>
            <div className="text-sm text-slate-700">Qualificação, dúvidas frequentes e confirmações automatizadas</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-emerald-700 mb-2">📅 Agenda Unificada</div>
            <div className="text-sm text-slate-700">IOP (Tasy) + particular — menos conflitos e sobreposições</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-emerald-700 mb-2">🔔 Confirmações e Reagendamentos</div>
            <div className="text-sm text-slate-700">Lembretes D‑1 e D‑2h; fila de espera para vagas liberadas</div>
          </div>
          <div className="bg-white p-4 rounded-lg md:col-span-2">
            <div className="font-bold text-emerald-700 mb-2">🔄 Follow‑up e Continuidade</div>
            <div className="text-sm text-slate-700">Retornos, exames e pós‑procedimento sob controle</div>
          </div>
        </div>
        <div className="text-xs text-slate-600 mt-4">Observação: resultados variam conforme mix de casos, volume e agenda disponível.</div>
      </div>
    </div>
  );
}

