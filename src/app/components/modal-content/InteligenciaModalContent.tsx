"use client";

export default function InteligenciaModalContent() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-sky-50 border border-sky-200 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-sky-900 mb-4">🧠 Inteligência Completa em Tempo Real</h3>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-sky-700 mb-2">📊 Métricas Operacionais</div>
            <ul className="space-y-1 text-slate-700">
              <li>• Taxa de conversão de leads (geral e por canal)</li>
              <li>• Horários com maior demanda por especialidade</li>
              <li>• Taxa de no-show por dia da semana e horário</li>
              <li>• Tempo médio de resposta aos leads</li>
              <li>• Taxa de ocupação da agenda</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-sky-700 mb-2">🎯 Inteligência Comercial</div>
            <ul className="space-y-1 text-slate-700">
              <li>• Especialidades mais procuradas vs. mais lucrativas</li>
              <li>• Principais objeções dos pacientes por tipo de serviço</li>
              <li>• Ticket médio por canal de origem</li>
              <li>• Oportunidades comerciais não aproveitadas</li>
              <li>• Perfil de pacientes de alto valor (LTV)</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-sky-700 mb-2">⚠️ Análise Preditiva</div>
            <ul className="space-y-1 text-slate-700">
              <li>• Previsão de no-show por paciente (score de risco)</li>
              <li>• Leads com maior probabilidade de conversão</li>
              <li>• Tendências de demanda por especialidade</li>
              <li>• Períodos de baixa conversão esperada</li>
              <li>• Projeção de receita mensal</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-sky-700 mb-2">💰 ROI e Performance</div>
            <ul className="space-y-1 text-slate-700">
              <li>• ROI em tempo real de cada canal de aquisição</li>
              <li>• CAC (Custo de Aquisição de Cliente) por origem</li>
              <li>• LTV (Lifetime Value) por perfil de paciente</li>
              <li>• Performance dos agentes de IA (taxa de resolução)</li>
              <li>• Economia gerada vs. operação manual</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-sky-100 to-emerald-100 p-4 rounded-lg border-2 border-sky-300">
            <div className="font-bold text-sky-900 text-lg mb-2">✨ Exemplo Prático</div>
            <div className="text-slate-800 text-sm space-y-2">
              <p><strong>Segunda-feira, 9h:</strong> Dashboard mostra que você teve 23 leads no fim de semana, com taxa de conversão de apenas 28% (abaixo da média de 45%).</p>
              <p><strong>Diagnóstico automático:</strong> Leads de fim de semana esfriam porque resposta demora. Sistema sugere: ativar bot para resposta imediata 24/7.</p>
              <p><strong>Ação tomada:</strong> Bot ativado. Semana seguinte, conversão de leads de fim de semana sobe para 42%.</p>
              <p className="text-emerald-700 font-bold">💰 Resultado: +R$ 6.300 em uma semana.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

