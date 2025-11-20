"use client";

export default function InsightsModalContent() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-h-[70vh] overflow-auto">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-purple-900 mb-4">Insights notificados via WhatsApp</h3>

        {/* Alerta Crítico 1 */}
        <div className="bg-white border-l-4 border-red-500 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div className="flex-1">
              <div className="font-bold text-red-700 mb-2">ALERTA 1: No-Show em Alta</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div><strong>O QUE:</strong> Taxa de no-show terça-feira subiu para 38% (média: 23%)</div>
                <div><strong>POR QUE:</strong> 87% das faltas são entre 14h-17h. Pacientes confirmam mas esquecem.</div>
                <div className="text-red-600 font-semibold">💸 IMPACTO: -R$ 12.400 essa semana</div>
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded mt-2">
                  <div className="font-semibold text-emerald-800 mb-1">✅ AÇÃO SUGERIDA:</div>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Adicionar lembrete EXTRA 2h antes (terças 14-17h)</li>
                    <li>• Ligar para confirmar pacientes de alto valor</li>
                    <li>• Testar reagendamento de terça para outro dia</li>
                  </ul>
                  <div className="text-emerald-700 font-bold mt-2">📈 RESULTADO ESPERADO: Reduzir no-show em 50% = +R$ 6.200/semana</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oportunidade 1 */}
        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💎</span>
            <div className="flex-1">
              <div className="font-bold text-emerald-700 mb-2">OPORTUNIDADE 1: Demanda Reprimida</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div><strong>O QUE:</strong> 47 pessoas na fila de espera para Ortopedia. Dra. Santos tem 12 horários vagos próxima semana.</div>
                <div><strong>POR QUE:</strong> Pacientes não sabem da disponibilidade. Recepção não liga para todos.</div>
                <div className="text-emerald-600 font-semibold">💰 OPORTUNIDADE: +R$ 5.640 em 1 semana</div>
                <div className="bg-sky-50 border border-sky-200 p-3 rounded mt-2">
                  <div className="font-semibold text-sky-800 mb-1">✅ AÇÃO SUGERIDA:</div>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Disparar mensagem automática para fila</li>
                    <li>• Priorizar top 20 por ordem de espera</li>
                    <li>• Oferecer 2-3 opções de horário</li>
                  </ul>
                  <div className="text-sky-700 font-bold mt-2">📈 RESULTADO ESPERADO: Preencher 80% das vagas = +R$ 4.512 capturados</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Estratégico 1 */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📊</span>
            <div className="flex-1">
              <div className="font-bold text-blue-700 mb-2">INSIGHT 1: Padrão de Conversão</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div><strong>DESCOBERTA:</strong></div>
                <ul className="space-y-1">
                  <li>• 35% dos leads chegam no DOMINGO (maior volume)</li>
                  <li>• Taxa de conversão domingo: 28%</li>
                  <li>• Taxa de conversão segunda: 48%</li>
                  <li>• Diferença: -20 pontos percentuais</li>
                </ul>
                <div className="mt-2"><strong>CAUSA RAIZ:</strong></div>
                <ul className="space-y-1">
                  <li>• Domingo: bot responde, mas sem urgência</li>
                  <li>• Segunda 9h: lead já esfriou, não responde mais</li>
                </ul>
                <div className="text-red-600 font-semibold mt-2">💸 PERDA ATUAL: 52 leads/mês × R$ 450 = -R$ 23.400/mês</div>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded mt-2">
                  <div className="font-semibold text-purple-800 mb-1">✅ SOLUÇÃO:</div>
                  <ol className="text-slate-700 space-y-1 list-decimal pl-5">
                    <li>Bot criar senso de urgência (&quot;só 3 vagas essa semana&quot;)</li>
                    <li>Oferecer agendamento imediato (não &quot;ligo segunda&quot;)</li>
                    <li>Disparo automático segunda 8h se não agendou</li>
                  </ol>
                  <div className="text-purple-700 font-bold mt-2">📈 META: Elevar conversão domingo de 28% → 42% = +R$ 25.200/mês</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Estratégico 2 */}
        <div className="bg-white border-l-4 border-orange-500 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div className="flex-1">
              <div className="font-bold text-orange-700 mb-2">INSIGHT 2: Objeção Principal</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div><strong>DESCOBERTA:</strong></div>
                <ul className="space-y-1">
                  <li>• 18 pedidos de orçamento cirurgia de varizes</li>
                  <li>• Só 4 fecharam (22% de conversão)</li>
                  <li>• 14 não responderam mais</li>
                </ul>
                <div className="mt-2"><strong>ANÁLISE DE CONVERSAS:</strong></div>
                <ul className="space-y-1">
                  <li>• 11 dos 14 mencionaram &quot;preço alto&quot; (79%)</li>
                  <li>• 3 não entenderam o que estava incluso no valor</li>
                </ul>
                <div className="text-red-600 font-semibold mt-2">💸 PERDA: 14 cirurgias × R$ 4.500 = -R$ 63.000 esse mês</div>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded mt-2">
                  <div className="font-semibold text-amber-800 mb-1">✅ SOLUÇÃO:</div>
                  <ol className="text-slate-700 space-y-1 list-decimal pl-5">
                    <li>Bot explicar TUDO incluso no valor (transparência)</li>
                    <li>Mostrar parcelamento em 6x ANTES da objeção</li>
                    <li>Enviar cases de sucesso + depoimentos automaticamente</li>
                    <li>Oferecer consulta gratuita para tirar dúvidas</li>
                  </ol>
                  <div className="text-amber-700 font-bold mt-2">📈 META: Elevar conversão de 22% → 45% = +R$ 18.000/mês</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tendência Positiva */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 p-5 rounded-lg">
          <div className="font-bold text-emerald-800 mb-3">✅ TENDÊNCIAS POSITIVAS (Continue Fazendo)</div>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-emerald-700">Lesão do LCA: Conversão subiu 18% (35% → 53%)</div>
              <div className="text-slate-700 mt-1">→ Motivo: resposta mais rápida no WhatsApp</div>
              <div className="text-emerald-600 font-semibold">→ Replicar: instruir equipe a priorizar esses casos</div>
            </div>

            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-emerald-700">Artroscopia: Zero no‑show essa semana</div>
              <div className="text-slate-700 mt-1">→ Motivo: lembrete D‑2/D‑1/D‑2h funcionando</div>
              <div className="text-emerald-600 font-semibold">→ Avaliar: manter e testar horário do lembrete</div>
            </div>

            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-emerald-700">Artrose: 12 marcações no período (recorde)</div>
              <div className="text-slate-700 mt-1">→ Motivo: conteúdo educacional sobre tratamento conservador</div>
              <div className="text-emerald-600 font-semibold">→ Ação: replicar pauta para Artroplastia</div>
            </div>
          </div>
        </div>

        {/* Resumo Financeiro */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300 p-5 rounded-lg mt-4">
          <div className="font-bold text-indigo-900 mb-3">💰 RESUMO FINANCEIRO DA SEMANA</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Oportunidades identificadas:</span>
              <span className="text-2xl font-bold text-indigo-700">+R$ 47.712</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Ações implementadas:</span>
              <span className="text-xl font-bold text-emerald-600">+R$ 18.300 (38%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Ainda em aberto:</span>
              <span className="text-xl font-bold text-orange-600">+R$ 29.412 (62%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Versão alinhada ao documento de arquitetura: métricas-chave, pipeline e crescimento
