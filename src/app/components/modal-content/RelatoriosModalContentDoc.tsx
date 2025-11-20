"use client";

export default function RelatoriosModalContentDoc() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-h-[70vh] overflow-auto">
      <div className="bg-white border border-slate-200 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Mês Atual (Outubro)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
            <div className="text-sm text-slate-600">Consultas realizadas</div>
            <div className="text-2xl font-bold text-slate-900">1.750</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
            <div className="text-sm text-slate-600">Ticket médio</div>
            <div className="text-2xl font-bold text-slate-900">R$ 400</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
            <div className="text-sm text-slate-600">Receita total</div>
            <div className="text-2xl font-bold text-slate-900">R$ 700.000</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Pipeline (Em Negociação)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
            <div className="text-sm text-emerald-700">Cirurgias em análise</div>
            <div className="text-2xl font-bold text-emerald-900">87</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
            <div className="text-sm text-emerald-700">Valor médio</div>
            <div className="text-2xl font-bold text-emerald-900">R$ 15.000</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
            <div className="text-sm text-emerald-700">Valor potencial</div>
            <div className="text-2xl font-bold text-emerald-900">R$ 1.305.000</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Crescimento</h3>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="text-sm text-amber-700">Crescimento vs mês anterior</div>
          <div className="text-2xl font-bold text-amber-900">+42%</div>
        </div>
      </div>

      <div className="text-xs text-slate-500">Números ilustrativos do documento de arquitetura; ajustar com dados reais quando integrado.</div>
    </div>
  );
}
