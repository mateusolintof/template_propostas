"use client";

import { useState } from "react";

type FaturamentoInputs = {
  leadsMes: number;
  taxaConversaoAtual: number;
  taxaConversaoNova: number;
  ticketMedio: number;
};

type CustosInputs = {
  funcionarios: number;
  salario: number;
  reducaoFuncionarios: number;
};

type Props = {
  preparedFor: string;
};

const investimento = 30000;
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const percentFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const formatCurrency = (value: number) =>
  currencyFormatter.format(Number.isFinite(value) ? value : 0);
const formatPercent = (value: number) =>
  `${percentFormatter.format(Number.isFinite(value) ? value : 0)}%`;

const defaultFaturamento: FaturamentoInputs = {
  leadsMes: 4500,
  taxaConversaoAtual: 15,
  taxaConversaoNova: 32,
  ticketMedio: 400,
};

const defaultCustos: CustosInputs = {
  funcionarios: 7,
  salario: 3500,
  reducaoFuncionarios: 2,
};

const calculateFaturamento = (values: FaturamentoInputs) => {
  const vendasAtuais = values.leadsMes * (values.taxaConversaoAtual / 100);
  const vendasNovas = values.leadsMes * (values.taxaConversaoNova / 100);
  const faturamentoAtual = vendasAtuais * values.ticketMedio;
  const faturamentoNovo = vendasNovas * values.ticketMedio;
  const aumentoMensal = faturamentoNovo - faturamentoAtual;
  const aumentoAnual = aumentoMensal * 12;
  const roi12 = ((aumentoAnual - investimento) / investimento) * 100;
  return { aumentoMensal, aumentoAnual, roi12 };
};

const calculateCustos = (values: CustosInputs) => {
  const custoAtualMensal = values.funcionarios * values.salario;
  const custoNovoMensal = (values.funcionarios - values.reducaoFuncionarios) * values.salario;
  const economiaMensal = custoAtualMensal - custoNovoMensal;
  const economiaAnual = economiaMensal * 12;
  const roi12 = ((economiaAnual - investimento) / investimento) * 100;
  return { economiaMensal, economiaAnual, roi12 };
};

export default function RoiModalContent({ preparedFor }: Props) {
  const [faturamentoInputs, setFaturamentoInputs] = useState<FaturamentoInputs>(defaultFaturamento);
  const [faturamentoResultados, setFaturamentoResultados] = useState(() => calculateFaturamento(defaultFaturamento));
  const [custosInputs, setCustosInputs] = useState<CustosInputs>(defaultCustos);
  const [custosResultados, setCustosResultados] = useState(() => calculateCustos(defaultCustos));

  const handleFaturamentoChange = (key: keyof FaturamentoInputs, value: number) => {
    setFaturamentoInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustosChange = (key: keyof CustosInputs, value: number) => {
    setCustosInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-full bg-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Simulador interativo</div>
          <h2 className="text-3xl md:text-4xl font-bold text-prime">Calculadora de ROI</h2>
          <p className="text-slate-600 text-sm md:text-base max-w-3xl mx-auto">
            Avalie rapidamente o ganho anual e o ROI em 12 meses considerando investimento fixo de R$ 30.000. Ajuste os campos e calcule cada cenário de forma independente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">Eficiência no Atendimento</p>
              <h3 className="text-xl font-bold text-prime">ROI por aumento de faturamento</h3>
              <p className="text-slate-600 text-sm mt-1">Projete a receita adicional com melhor conversão dos leads atuais.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Leads por mês
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={faturamentoInputs.leadsMes}
                  onChange={(e) => handleFaturamentoChange("leadsMes", Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Taxa de conversão atual (%)
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={faturamentoInputs.taxaConversaoAtual}
                  onChange={(e) => handleFaturamentoChange("taxaConversaoAtual", Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Nova taxa de conversão (%)
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={faturamentoInputs.taxaConversaoNova}
                  onChange={(e) => handleFaturamentoChange("taxaConversaoNova", Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Ticket médio (R$)
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={faturamentoInputs.ticketMedio}
                  onChange={(e) => handleFaturamentoChange("ticketMedio", Number(e.target.value))}
                />
              </label>
            </div>
            <button
              className="btn-primary w-full justify-center"
              onClick={() => setFaturamentoResultados(calculateFaturamento(faturamentoInputs))}
            >
              Calcular ROI – Faturamento
            </button>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: "Aumento Mensal de Faturamento", value: formatCurrency(faturamentoResultados.aumentoMensal) },
                { label: "Aumento Anual de Faturamento", value: formatCurrency(faturamentoResultados.aumentoAnual) },
                { label: "ROI em 12 meses", value: formatPercent(faturamentoResultados.roi12) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-600 font-semibold">{item.label}</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500">Investimento considerado: {formatCurrency(investimento)}</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">Redução de Custos</p>
              <h3 className="text-xl font-bold text-prime">ROI por redução de quadro</h3>
              <p className="text-slate-600 text-sm mt-1">Simule economia liberando FTEs com agentes de IA.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Funcionários dedicados hoje
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={custosInputs.funcionarios}
                  onChange={(e) => handleCustosChange("funcionarios", Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Salário médio (R$)
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={custosInputs.salario}
                  onChange={(e) => handleCustosChange("salario", Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                FTEs liberados
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-prime focus:ring-1 focus:ring-prime outline-none"
                  value={custosInputs.reducaoFuncionarios}
                  onChange={(e) => handleCustosChange("reducaoFuncionarios", Number(e.target.value))}
                />
              </label>
            </div>
            <button
              className="btn-primary w-full justify-center"
              onClick={() => setCustosResultados(calculateCustos(custosInputs))}
            >
              Calcular ROI – Equipe
            </button>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: "Economia Mensal", value: formatCurrency(custosResultados.economiaMensal) },
                { label: "Economia Anual", value: formatCurrency(custosResultados.economiaAnual) },
                { label: "ROI em 12 meses", value: formatPercent(custosResultados.roi12) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-600 font-semibold">{item.label}</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500">Investimento considerado: {formatCurrency(investimento)}</div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Resultados ilustrativos; ajuste os parâmetros conforme dados reais do {preparedFor}.
        </div>
      </div>
    </div>
  );
}
